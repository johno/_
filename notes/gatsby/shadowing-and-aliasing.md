# Component shadowing and namespaces

Child themes can be leveraged as a way to share more foundational concerns like content sourcing and data handling. They can also be used to customize the look of appearances via component shadowing. Currently child themes can shadow their parents using the existing namespace strategy. So, when a parent theme (`gatsby-theme-blog`) has a component BlogPost that a child theme wants to shadow, the child theme can create the following file `src/gatsby-theme-blog/components/BlogPost.js` and customize the rendering of the blog post.

This is nice and explicit, however it begins to break down in child theming contexts for a couple reasons:

- Shadowing components in a child theme exposes the directory structure of the parent theme
- Doesn't address horizontal theme composition

## An example implementation

In order to elaborate, let's consider an example implementation. It's likely that we can end up with a common theme architecture like the following:

```
[DATA MODELS] => [PAGE CREATION/SOURCING] => [STYLING]
```

The data model might be something like `gatsby-data-blog` that determines the schema for a blog. This would dictate concerns like frontmatter shape, posts, authors, etc. The second layer of this theme tree could be `gatsby-theme-blog` which sources pages, handles page creation and concerns like tag-based index pages, pagination, etc. This would likely be common amongst a large collection of themes to avoid reinventing the wheel.

The third them in this heirarchy would be `gatsby-theme-pink`. It's only concern is styling/skinning a blog site. I anticipate a lot of themes wanting to operate at this layer. I.e., a base theme is used for implementing functionality like GraphQL queries and page creation and multiple child themes inherit from this base and implement different designs.

## Child theme shadowing

If a theme author is writing the theme, `gatsby-theme-pink`, they will currently have to introduce their own components by shadowing directly from `gatsby-theme-blog`. As such, its folder structure might end up looking something like:

```
src/
  components/
    Header.js
    Footer.js
    NewsletterSignup.js
  gatsby-theme-blog/
    components/
      BlogPost.js
      BlogPostList.js
      AuthorBio.js
      Layout.js
```

This is a bit unfortunate because the bulk of the library code is stuck an extra directory level deep inside `gatsby-theme-blog`. It's nice in some ways because it's explicit about what's happening, but it doesn't come without its drawbacks.

First, let's consider the end user that installs `gatsby-theme-pink` and wants to change the AuthorBio component. Their first inclination would be to shadow `src/gatsby-theme-pink/AuthorBio.js`. Unfortunately, that wouldn't result in a successful component shadow. The end user would need to override `src/gatsby-theme-blog/AuthorBio.js`. This is problematic because `gatsby-theme-pink` is forced to expose its implementations details (the parent theme) or manually handle exports:

```js
// src/gatsby-theme-blog/components/AuthorBio.js
export { default } from '../../components/AuthorBio.js'
```

## Horizontal theme composition

Another tricky consideration is how a child theme can achieve horizontal theme composition.

Let's say.

```
gatsby-data-blog -> gatsby-theme-blog - \
                                         \
                                          gatsby-theme-pink
                                         /
gatsby-data-store -> gatsby-theme-store /
```

This type of implementation directly couples `gatsby-theme-pink` to both `gatsby-theme-blog` and `gatsby-theme-store` because it has to achieve rendering via shadowing. This means that `gatsby-theme-blog` can't be readily swapped out for `gatsby-theme-blog-plus-plus` despite it implementing the same API (and more features) if the user wants to use `gatsby-theme-pink`. This coupling occurs because component shadowing is tied to the theme name of the parent.

### Why does this matter?

Designing with horizontal composition in mind empowers theming authors to build components for common usecases that aren't used until the required parent theme is installed. Until the installation occurs, the extra components are effectively ignored. This way `gatsby-theme-pink` can build a component library for a bunch of common uses like blog, portfolio, store, etc. When `gatsby-theme-portfolio` is installed, the components from `gatsby-theme-pink` are automatically pulled in (shadowed).

## Global namespacing

A potential solution would be to allow global namespacing for components. This would allow for themes to adopt naming conventions that allow for more flexible interchangeability between themes. This would allow `gatsby-theme-pink` to define a directory structure like:

```
src/
  components/
    Header.js
    Footer.js
    NewsletterSignup.js
    BlogPost.js
    BlogPostList.js
    AuthorBio.js
    Layout.js
```

