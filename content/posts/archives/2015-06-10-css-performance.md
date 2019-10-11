---
layout: post
title: Improving CSS Performance
summary: With a few considerations when typing CSS we can ensure that our CSS is as performant as possible for the end user. These are some concepts I like to keep in mind when typing and analyzing CSS.
tags:
  - css
  - performance
date: 2015-06-10
slug: /css/2015/06/10/css-performance/
---

With a few considerations when typing CSS we can ensure that our CSS is as performant as possible for the end user. These are some concepts I like to keep in mind when typing and analyzing CSS.

### Minify and concatenate

One of the biggest factors in loading a web page is network IO, so it’s important to ensure that your CSS has the smallest footprint possible. This starts by concatenating stylesheets into a single file and sending out a minified version over the wire. Concatenation is important because your CSS should only require one HTTPS request. Minification removes unnecessary bytes that results from whitespace formatting when sending to your user.

### Decrease the stylesheet size

Smaller stylesheets with fewer selectors result in less work for the browser during the style resolution step. This means removing unnecessary selectors, leveraging utility classes, and avoiding duplicated CSS can have a significant impact. Tools like [uncss](https://github.com/giakki/uncss) are extremely useful for ensuring that a stylesheet only contains CSS that is being used by the HTML page.

### Avoid the descendant selector

The [descendant](https://developer.mozilla.org/en-US/docs/Web/CSS/Descendant_selectors) selector is very costly, as the browser must check for a match with _every_ descendant element. On a complex web page, this can result in thousands and thousands (perhaps even more) of descendant selector searches. It is so expensive because the relationship isn’t restricted to parent and child. As such, I prefer to avoid it whenever possible.

### Structure selector right to left

When the browser is resolving CSS selectors, it parses from right to left. So, with the selector, `.some-class ul li a`, the browser will:

1. match every `<a>` on the page

- find every `<a>` contained within a `<li>`
- narrow down the matches above to every `<li>` that has a containing `<ul>`
- filter further to every `<ul>` from above to those contained within `.some-class`

As one can see, it’s vital to ensure that the rightmost selector will be efficient for the browser to interpret and filter upon. `.some-class ul li a` could be best replaced with a selector like `.some-class-list-link`.

### Use expensive properties sparingly

There are a handful of CSS properties that are more expensive than the rest, and should only be used sparingly:

- `border-radius`
- `box-shadow`
- `transform`
- `filter`
- `:nth-child`
- `position: fixed;`
- etc.

This is really up to using your best judgement. If an element will show up hundreds or thousands of times on a page, it’s probably best to avoid using the above properties. However, applying a `box-shadow` to your `<header>` probably won’t affect render performance.

### Don’t use universal selectors

Universal selectors like `*`, `[disabled]`, `[type=“text”]`, etc. are very expensive for the browser to match, as _every_ element in the DOM must be checked.

The universal selector is often used for `box-sizing` and other globals. However, this can often be optimized by grouping relevant elements. See [mrmrs’ box-sizing solution](https://github.com/mrmrs/tachyons-box-sizing) for an example.

## Further reading

- <http://benfrain.com/css-performance-revisited-selectors-bloat-expensive-styles/>
- <https://speakerdeck.com/jonrohan/githubs-css-performance>
- <https://developer.mozilla.org/en-US/docs/Web/CSS/Descendant_selectors>
- <https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Writing_efficient_CSS>
- <http://www.html5rocks.com/en/tutorials/speed/css-paint-times/>
- <http://xn--h4hg.ws/2014/12/18/caring/>
