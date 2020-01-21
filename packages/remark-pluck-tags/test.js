const remark = require('remark')
const mdx = require('remark-mdx')

const pluckTags = require('.')

const FIXTURE = `
# Hello, world!

<Tag name="foo" /> <Tag name="bar" />

Some stuff

<Tag name="baz" />
`

test('plucks tags', () => {
  const result = remark()
    .use(mdx)
    .use(pluckTags)
    .processSync(FIXTURE)

  expect(result.data.tags).toEqual(['foo', 'bar', 'baz'])
})
