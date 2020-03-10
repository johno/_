import { graphql, useStaticQuery } from "gatsby"

export default () => {
  const data = useStaticQuery(graphql`
    {
      austereOptions(id: { eq: "gatsby-theme-austere-options" }) {
        withDarkMode
      }
    }
  `)

  return data.austereOptions
}
