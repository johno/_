# Architecture

Maintaining a common component layout ensures that all our apps appear familiar.
Having a foundational architecture with reference definitions can help disparate apps maintain a similar look and feel.
This also helps to ensure that apps evolve concurrently.

- [Overview](#overview)
- [Container](#container)
- [Theme](#theme)
- [Presentational](#presentational)
  - [Primitive](#primitive)
  - [Composite](#composite)
  - [Data object](#data-object)
- [Forms](#forms)

## Overview

There should be a logical and predictable distinction between state containers and presentational components.
Top level container/store components handle “page” level state and data interaction, propagating state and callbacks to the component tree via props.
Containers shouldn’t be worried about styling concerns. Presentational components should be only handle local state (`isOpen`) and be primarily concerned with styling.
They should typically pass events to the state container(s).

Props drilling more than a few levels is a code smell and should be eliminated.

State should typically be global in the app and take on a predictable shape/schema.
One should favor keying by id and avoid deep nesting. Different aspects of state should be namespaced.

HOCs are great for top level configuration, layout, and context, but should be used sparingly in favor of render props.
Render props are great for sharing logic between components and allowing granular control of the rendering for flexibility.

## Container

Container components map to "pages" and live in `pages`.
Next.js automagically maps these to urls (with some customizations in `server/routes.js` for chapters).
Container components don't preoccupy themselves with styling concerns.
They care about business logic and data fetching.
Their render functions should be clean and only forward data and event listeners.

> [How does it work?][components]

### Example container

```jsx
const Chapter = ({ author, chapter}) => (
  <Layout {...ddsLayout}>
    <Hero {...chapter} />
    <Container>
      <Flex>
        <Sticky>
          <AuthorCard {...author} />
        </Sticky>
        <ChapterContent>
          <Markdown>{content}</Markdown>
        </ChapterContent>
      </Flex>
    </Container>
  </Layout>
);
```

## Theme

The theme for this app lives in `theme.js`.
This sticks to the existing Clearbit Styleguide, with a few customizations for book specific styles.
These are leveraged via props/styled functions with `styled-system`.

### Example theme definition and usage

#### Theme definition

```js
const fontSizes = [10, 14, 16, 24, 28, 32, 45];
const fontFamilies = {
  sans: '"Avenir Next", sans-serif',
  mono: 'monospace',
  serif: 'serif'
};

const fontWeights = {
  bold: 600,
  normal: 400,
  light: 300
};

export {
  fontFamilies,
  fontSizes,
  fontWeights
}
```

#### Component definition

```jsx
import styled from 'styled-system';
import { fontSize, fontFamily, fontWeight } from 'styled-system';

export default styled.p`
  ${fontSize}
  ${fontFamily}
  ${fontWeight}
`;
```

Note that this is typically referred to as a primitive component.

#### Component usage

```jsx
import { Text } from './primitives';

export default ({ children }) => (
  <Text
    f={[1, 2, 4]}
    fontWeight='bold'
    children={children}
  />
);
```

## Presentational

Presentational components are typically functional components and are concerned with how things look.
They can be divided into two component types, Primitive and Composite.

> [How does it look?][components]

### Primitive

Primitive components live in `components/primitives` or `components/primitives.js`.
These are typically mapped to html elements, and serve as the building blocks for composite components.

#### Example primitive

```jsx
const BgImage = styled.div`
  ${backgroundImage}
  ${backgroundRepeat}
  ${backgroundSize}
  ${backgroundPosition}
`;

BgImage.displayName = 'BgImage';
BgImage.defaultProps = {
  bgSize: 'cover',
  bgRepeat: 'no-repeat',
  bgPosition: 'center'
};

export default BgImage;
```

### Composite

Composite components currently live in the root of of `components`.
They're compositions of primitive components and serve as the outermost level of components that care about presentational concerns.

#### Example composite

```jsx
import { Box } from './primitives';
import { ClearbitLogo } from '.';

const Footer = styled(Box.withComponent('footer'))`
  display: flex;
  justify-content: space-around;
  border-top: thin solid rgba(0, 0, 0, 0.05);
  padding: 50px 0;
  margin-top: 50px;
  text-align: center;
`;

export default ({ bg, chaptersUrl }) => (
  <Box px={3} bg={bg} color="white">
    <Footer mx="auto" maxWidth="container" textAlign="center">
      <ClearbitLogo />
    </Footer>
  </Box>
);
```

#### Data object

Composite components are often also tied to data objects.
Data objects are POJOs with a schema that sit between clients and components.
This ensures that data is preprocessed for the UI, optimizing for React's rendering cycle and ensuring that the API surface area is as small as possible.

##### Objects

```jsx
<AuthorCard {...author} />
```

##### Arrays

```jsx
<UserList users={users} />
```

Note that not all composite components require ties to a data object, composite components can also be purely static.

## Forms

All form related components (state handling, presentation, submission) live in `components/forms`.
They're self-contained, ephemeral containers related to form concerns.
They handle validation, presentation, form submission, and communicate with containers via event bindings.

### Example usage of a `formik` HOC

```jsx
const Form = withFormik({
  mapPropsToValues: props => ({ email: '' }),
  validate: (values, props) => {
    const errors = {};

    if (!values.email) {
      errors.email = 'An email is required';
    } else if (!isEmail(values.email)) {
      errors.email = 'Email is invalid';
    }

    return errors;
  }
})(InlineEmail);

export default Form;
```

[components]: https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0

