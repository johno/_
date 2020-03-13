import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

import { uuid } from './util'
import { FIREBASE_CONFIG } from './constants'

if (typeof window !== 'undefined') {
  app.initializeApp(FIREBASE_CONFIG)
}

export const db = () => app.firestore()
export const auth = () => app.auth()

export const providers = {
  google: new app.auth.GoogleAuthProvider()
}

export const getTodo = async id => {
  const doc = await db()
    .collection('todos')
    .doc(id)
    .get()

  return { ...doc.data(), id }
}

export const getTodos = async user => {
  const docRefs = await db()
    .collection('todos')
    .where('userId', '==', user.uid)
    .get()

  const docs = []
  docRefs.forEach(doc => {
    docs.push({
      ...doc.data(),
      id: doc.id
    })
  })

  return docs
}

export const updateTodo = async doc => {
  await db()
    .collection('todos')
    .doc(doc.id)
    .set(doc)
}

export const markToggleComplete = async doc => {
  await db()
    .collection('todos')
    .doc(doc.id)
    .set({
      ...doc,
      isComplete: !doc.isComplete
    })
}

export const createTodo = async (user, data = {}) => {
  const id = uuid()

  await db()
    .collection('todos')
    .doc(id)
    .set({
      id,
      projectId: null,
      tags: [],
      ...data,
      metadata: {},
      createdAt: new Date(),
      userId: user.uid,
      isComplete: false
    })

  return { id }
}

export default app
