/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import { ArrowRight, XSquare, CheckSquare } from 'react-feather'

import { getTodos, createTodo, markToggleComplete } from '../lib'
import useCurrentUser from '../use-current-user'

const Todo = ({ todo, isActive, onClick }) => {
  const [isComplete, setIsComplete] = useState(todo.isComplete)

  const handleToggle = () => {
    markToggleComplete(todo)
    setIsComplete(!isComplete)
  }

  const completeStyles = isComplete
    ? {
        opacity: 0.6,
        backgroundColor: 'muted',
        textDecoration: 'line-through'
      }
    : {}

  return (
    <section
      onClick={onClick}
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
          ...completeStyles,
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
        <h3
          sx={{ m: 0, textDecoration: isComplete ? 'strikethrough' : 'none' }}
        >
          {todo.title}
        </h3>
        {isComplete ? (
          <XSquare aria-label="Mark as incomplete" onClick={handleToggle} />
        ) : (
          <CheckSquare aria-label="Mark as complete" onClick={handleToggle} />
        )}
      </div>
      {isActive ? (
        <div sx={{ textAlign: 'right', px: 3, py: 2 }}>
          <Link sx={{ color: 'inherit' }} to={`/edit?id=${todo.id}`}>
            <ArrowRight />
          </Link>
        </div>
      ) : null}
    </section>
  )
}

const NewTodo = ({ currentUser, onSubmit }) => {
  const [title, setTitle] = useState('')
  if (!currentUser) {
    return null
  }

  const handleSubmit = e => {
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
          Todo title
        </span>
        <input
          type="text"
          placeholder="Add a todo..."
          value={title}
          onChange={e => setTitle(e.target.value)}
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
        value="Create todo"
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
  const [activeTodoId, setActiveTodoId] = useState(null)

  const getAllTodos = async () => {
    const records = await getTodos(currentUser)
    setTodos(records)
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
      {todos.map(todo => {
        const isActive = activeTodoId === todo.id
        return (
          <Todo
            key={todo.id}
            todo={todo}
            isActive={isActive}
            onClick={() => setActiveTodoId(isActive ? null : todo.id)}
            sx={{ mb: 2 }}
          />
        )
      })}
    </div>
  )
}
