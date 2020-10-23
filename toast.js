import { fetchMdxFromDisk } from '@toastdotdev/mdx'
import mdx from '@mdx-js/mdx'
import fm from 'gray-matter'

export const sourceData = async ({ setDataForSlug }) => {
  const [srcPages, posts] = await Promise.all([
    fetchMdxFromDisk({
      directory: './src/pages'
    }),
    fetchMdxFromDisk({
      directory: './content/posts'
    })
  ])
  const allMdx = srcPages
    .map(({ filename, file }) => {
      const slug = filename
        .slice('src/pages'.length, filename.length)
        .replace(/.mdx$/, '')
      return { slug, filename, file }
    })
    .concat(
      posts.map(({ filename, file }) => {
        const { data, content } = fm(file)
        const slug = filename
          .slice('content/posts'.length, filename.length)
          .replace(/.mdx$/, '')
        return { slug: data.slug || slug, filename, file: content, data }
      })
    )
  Promise.all(
    allMdx.map(async ({ file, slug, data }) => {
      let compiledMdx = await mdx(file)
      await setDataForSlug(slug, {
        component: {
          mode: 'source',
          value: `/** @jsx mdx */
import { mdx } from '@mdx-js/preact';
${compiledMdx}`
        },
        data
      })
      return
    })
  )
  return
}
