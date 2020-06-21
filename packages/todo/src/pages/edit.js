/** @jsx jsx */
import { useState, useEffect, useRef } from 'react'
import { jsx } from 'theme-ui'
import * as presets from '@theme-ui/presets'
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

  const handlePresetChange = (e) => {
    const presetName = e.target.value
    const theme = presets[presetName]

    setTodo({ ...todo, theme, presetName })
  }

  if (!todo) {
    return <Layout />
  }

  console.log({ todo })

  return (
    <Layout>
      <div
        sx={{
          display: 'flex'
        }}
      >
        <div sx={{ width: '50%', mr: 2 }}>
          <div
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
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
                placeholder="Begin writing..."
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
                Theme
              </span>
              <select value={todo.presetName} onChange={handlePresetChange}>
                <option>Select a theme</option>
                {Object.keys(presets).map((preset) => (
                  <option key={preset}>{preset}</option>
                ))}
              </select>
            </label>
          </div>
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
                wordBasedSuggestions: false,
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
          <Render theme={todo.theme}>{todo.content || ''}</Render>
        </div>
      </div>
    </Layout>
  )
}
