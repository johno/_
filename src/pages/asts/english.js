/** @jsx jsx */
import { useState, useEffect } from 'react'
import { jsx } from 'theme-ui'
import unified from 'unified'
import partsOfSpeech from 'retext-pos'
import english from 'retext-english'
import stringify from 'retext-stringify'

export default () => {
  const [text, setText] = useState('Mary loves cats.')
  const [output, setOutput] = useState(text)
  const [pluginCode, setPluginCode] = useState('console.log(tree)')
  const [ast, setAST] = useState({})

  useEffect(() => {
    let plugin = null
    let newOutput = null

    try {
      plugin = options => tree => {
        const fn = new Function('options', 'tree', pluginCode)
        return fn(options, tree)
      }
    } catch (e) {
      console.log(e)
    }

    plugin()(ast)

    try {
      newOutput = unified()
        .use(english)
        .use(partsOfSpeech)
        .use(_ => tree => setAST(tree))
        .use(plugin)
        .use(stringify)
        .processSync(text)
    } catch (e) {}

    if (newOutput) {
      setOutput(newOutput.contents)
    }
  }, [text, pluginCode])

  return (
    <div sx={{ display: 'flex', fontSize: 16 }}>
      <div
        sx={{
          width: ['100%', '50%', '50%']
        }}
      >
        <textarea
          sx={{
            height: ['25vh', '50vh', '50vh'],
            width: '100%',
            border: 'none',
            fontSize: 20
          }}
          onChange={e => setText(e.target.value)}
          value={text}
        />
        <textarea
          sx={{
            height: ['25vh', '50vh', '50vh'],
            width: '100%',
            border: 'none',
            fontSize: 20
          }}
          onChange={e => setPluginCode(e.target.value)}
          value={pluginCode}
        />
      </div>
      <div
        sx={{
          width: ['100%', '50%', '50%']
        }}
      >
        <div
          sx={{
            height: ['25vh', '50vh', '50vh'],
            overflow: 'auto'
          }}
        >
          <pre>{JSON.stringify(ast, null, 2)}</pre>
        </div>
        <div
          sx={{
            height: ['25vh', '50vh', '50vh'],
            overflow: 'auto'
          }}
        >
          {output}
        </div>
      </div>
    </div>
  )
}
