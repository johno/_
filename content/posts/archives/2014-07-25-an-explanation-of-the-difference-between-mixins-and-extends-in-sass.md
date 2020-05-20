---
layout: post
title: An Explanation of the Difference Between Mixins and Extends in Sass
summary: The failure to use Sass mixins and extends correctly can result in bloated, inefficient CSS. So, I decided to dive into the differences, and illustrate the correct use cases for each.
tags:
  - sass
date: 2014-07-25
slug: /design/2014/07/25/an-explanation-of-the-difference-between-mixins-and-extends-in-sass/
---

[Sass](http://sass-lang.com/) is a powerful front-end tool. CSS has considerable syntactic limitations when it comes to employing the DRY Principle, so the Sass Preprocessor was developed to address that wart. However, when leveraged incorrectly, Sass can generate some terrible, inefficient, and bloated CSS. Though this isn't a shortcoming in Sass, it's an implementation issue. As The Sass Way [stated](http://thesassway.com/editorial/sass-doesnt-create-bad-code-bad-coders-do): "Sass doesn't create bad code. Bad coders do."

### Where does the bad code come from?

In most cases, the bad code that's generated is the result of the Sass `@mixin` being used incorrectly. Mixins are intended to group CSS declarations that will be reused, or `@include`d. When a mixin is included within the block of a selector, the CSS declarations are copied over during compilation. This can create redundant declarations when leveraged incorrectly:

#### Consider the following code:

```scss
@mixin text-blue {
  color: blue;
}

.article {
  @include text-blue;
}

.title {
  @include text-blue;
}
```

It looks innocuous enough; however, the generated code is rather inefficient.

```css
.article {
  color: blue;
}

.title {
  color: blue;
}
```

This example is definitely contrived, but one must consider the ramifications of this implementation on the web app scale. If there are hundreds, perhaps thousands, of mixins being used this way, there could be thousands of duplicated declarations that the end user has to download, and the browser has to interpret.

#### An efficient use case for the mixin

The mixin is best used for accepting a variable, and making declarations based upon the variable it receives

```scss
@mixin border-radius($border-radius) {
  border-radius: $border-radius;
}

.article {
  @include border-radius(2px);
}

.title {
  @include border-radius(4px);
}
```

Which results in the following, less bloated, CSS:

```css
.article {
  border-radius: 2px;
}

.title {
  border-radius: 4px;
}
```

### Using extend to avoid duplicated declarations

When a class is extended, it will be added to the selector list of the block that is being extended.

#### Consider the following code:

```scss
.text-blue {
  color: blue;
}

.article {
  @extend .text-blue;
}

.title {
  @extend .text-blue;
}
```

Which results in:

```css
.text-blue,
.article,
.title {
  color: blue;
}
```

This is advantageous for a few reasons. Firstly, the declaration of `color: blue;` is made only one time. Secondly, this results in readable CSS that doesn't feel "compiled". Lastly, changing the blue from `#7BC3E9` to `#46B1EB` only requires a single line to be changed.

## Further reading

- https://coderwall.com/p/7p7w2a
- http://css-tricks.com/the-extend-concept/
- http://thesassway.com/editorial/sass-doesnt-create-bad-code-bad-coders-do
- http://miguelcamba.com/blog/2013/07/11/sass-placeholders-versus-mixins-and-extends/
