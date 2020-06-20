/** @jsx jsx */
import { useState, useEffect, useRef } from 'react'
import { jsx } from 'theme-ui'
import getQueryParam from 'get-query-param'
import Monaco from '@monaco-editor/react'

import { getTodo, updateTodo } from '../lib'
import useDebounce from '../use-debounce'

import Layout from '../components/layout'
import Render from '../components/render'

export default () => {
  const editorRef = useRef(null)
  const [todo, setTodo] = useState(null)
  const debouncedTodo = useDebounce(todo)

  useEffect(() => {
    fetchTodo()
  }, [])

  const handleEditorDidMount = (_, editor) => {
    editorRef.current = editor

    editorRef.current.onDidChangeModelContent((ev) => {
      const value = editorRef.current.getValue()
      setTodo({ ...todo, content: value })
    })
  }

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

  const handleChange = (key) => (e) => {
    setTodo({ ...todo, [key]: e.target.value })
  }

  if (!todo) {
    return <Layout />
  }

  return (
    <Layout>
      <div
        sx={{
          display: 'flex'
        }}
      >
        <div sx={{ width: '50%' }}>
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
          <div
            sx={{
              height: '100vh'
            }}
          >
            <Monaco
              height="100%"
              width="90%"
              value={todo.content || ''}
              language="markdown"
              editorDidMount={handleEditorDidMount}
              theme="light"
              loading={<h1>Loading page content...</h1>}
              options={{
                minimap: {
                  enabled: false
                },
                scrollbar: {
                  vertical: 'hidden'
                }
              }}
            />
          </div>
        </div>
        <div sx={{ width: '50%' }}>
          <Render>{todo.content || ''}</Render>
        </div>
      </div>
    </Layout>
  )
}
