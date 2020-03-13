/** @jsx jsx */
import { useState, useEffect } from 'react'
import { jsx } from 'theme-ui'
import getQueryParam from 'get-query-param'

import { getTodo, updateTodo } from '../lib'
import Layout from '../components/layout'
import useDebounce from '../use-debounce'

export default () => {
  const [todo, setTodo] = useState(null)
  const debouncedTodo = useDebounce(todo)

  useEffect(() => {
    fetchTodo()
  }, [])

  const fetchTodo = async () => {
    const id = getQueryParam('id', window.location.href)
    const record = await getTodo(id)

    setTodo(record)
  }

  // We don't need to save until the user is done typing for now.
  useEffect(() => {
    if (todo) {
      updateTodo(todo)
    }
  }, [debouncedTodo])

  const handleChange = key => e => {
    setTodo({ ...todo, [key]: e.target.value })
  }

  if (!todo) {
    return <Layout />
  }

  return (
    <Layout>
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
          value={todo.title}
          onChange={handleChange('title')}
          sx={{
            border: 0,
            fontSize: [3, 4, 4],
            fontWeight: 'bold',
            py: 2,
            borderRadius: 4,
            border: 'thin solid transparent',
            width: '100%',
            mb: 3,
            '&:focus': {
              outline: 'none',
              border: 'thin solid transparent'
            }
          }}
        />
      </label>
      <textarea
        sx={{
          fontSize: 3,
          lineHeight: 1.2,
          width: '32em',
          minHeight: '40vh',
          border: 'thin solid transparent',
          '&:focus': {
            border: 'thin solid transparent',
            outline: 0
          }
        }}
        placeholder="Include additional details..."
        value={todo.content || ''}
        onChange={handleChange('content')}
      />
    </Layout>
  )
}
