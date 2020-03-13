import { useState, useEffect } from 'react'

import client, { providers } from './lib'

export default () => {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    setCurrentUser(client.auth().currentUser)

    client.auth().onAuthStateChanged(user => {
      setCurrentUser(user)
    })
  }, [])

  const login = () => client.auth().signInWithPopup(providers.google)
  const logout = () => client.auth().signOut()

  return { currentUser, logout, login }
}
