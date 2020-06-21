/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState, useEffect } from 'react'
import { Link } from 'gatsby'

import { getTodos, createTodo } from '../lib'
import useCurrentUser from '../use-current-user'

const Todo = ({ todo }) => {
  return (
    <section
      sx={{
        width: '24em',
        mx: 'auto'
      }}
    >
      <div
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 3,
          py: 2,
          borderRadius: 4,
          border: 'thin solid transparent',
          cursor: 'pointer',
          '&:hover': {
            outline: 'none',
            border: 'thin solid #eee',
            boxShadow: `
              0 2px 3px -1px rgba(0,0,0,.16),
              0 1px 2px -1px rgba(0,0,0,.08)
            `,
            opacity: 1
          }
        }}
      >
        <h3 sx={{ m: 0, width: '100%' }}>
          <Link
            sx={{
              color: 'inherit',
              display: 'flex',
              textDecoration: 'none',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
            to={`/edit?id=${todo.id}`}
          >
            {todo.title}
          </Link>
        </h3>
      </div>
    </section>
  )
}

const NewTodo = ({ currentUser, onSubmit }) => {
  const [title, setTitle] = useState('')
  if (!currentUser) {
    return null
  }

  const handleSubmit = (e) => {
    onSubmit(e, { title })
    setTitle('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      sx={{ textAlign: 'center', mb: 3, width: '24em', mx: 'auto' }}
    >
      <label>
        <span
          sx={{
            position: 'absolute',
            left: -10000,
            top: 'auto',
            width: 1,
            height: 1,
            overflow: 'hidden'
          }}
        >
          Page title
        </span>
        <input
          type="text"
          placeholder="Create a new page..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{
            border: 0,
            fontSize: [3, 4, 4],
            px: 3,
            py: 2,
            borderRadius: 4,
            border: 'thin solid transparent',
            width: '100%',
            '&:focus': {
              outline: 'none',
              border: 'thin solid #eee',
              boxShadow: `
              0 2px 3px -1px rgba(0,0,0,.16),
              0 1px 2px -1px rgba(0,0,0,.08)
            `
            }
          }}
        />
      </label>
      <input
        type="submit"
        value="Create a new page"
        sx={{
          position: 'absolute',
          left: -10000,
          top: 'auto',
          width: 1,
          height: 1,
          overflow: 'hidden'
        }}
      />
    </form>
  )
}

export default () => {
  const { currentUser } = useCurrentUser()
  const [todos, setTodos] = useState([])

  const getAllTodos = async () => {
    const records = await getTodos(currentUser)
    const completeTodos = records.filter((r) => r.isComplete)
    const incompleteTodos = records.filter((r) => !r.isComplete)
    setTodos([...incompleteTodos, ...completeTodos])
  }

  useEffect(() => {
    if (currentUser) {
      getAllTodos()
    }
  }, [currentUser])

  const handleSubmit = async (e, { title }) => {
    e.preventDefault()
    await createTodo(currentUser, { title })
    getAllTodos()
  }

  return (
    <div>
      <NewTodo currentUser={currentUser} onSubmit={handleSubmit} />
      {todos.map((todo) => {
        return <Todo key={todo.id} todo={todo} sx={{ mb: 2 }} />
      })}
    </div>
  )
}
