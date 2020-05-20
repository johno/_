---
layout: post
title: Jekyll and UnCSS
summary: An example using Jekyll and UnCSS to ensure unused CSS is removed during the build.
tags:
  - jekyll
  - performance
date: 2015-06-06
slug: /jekyll/2015/06/26/jekyll-and-uncss/
---

Jekyll is a great tool for building static sites, however, I often see many projects that are including a lot of unused CSS. Since Jekyll generates an entire working site in the `_site` directory, we can use it to run [`uncss`](https://github.com/giakki/uncss). Below outlines an example project using `uncss` and a `build.js` script.

**Note: this assumes you have `node` and `npm` installed.**

## Setting up the project

Firstly, let's set up the project.

```
jekyll new uncss-example && cd uncss-example
```

And, add the `uncss` module.

```
npm init
echo 'node_modules' >> .gitignore
npm i --save uncss glob
```

Now add the following line to the `_config.yml` to exclude the `node_modules` in the jekyll build:

```yaml
exclude: ['node_modules']
```

And modify the `scripts` object in your `package.json` to look like:

```json
"scripts": {
    "uncss": "jekyll build && node build.js"
  },
```

## Create the build script

`build.js`

```js
var uncss = require('uncss')
var glob = require('glob')
var fs = require('fs')

var stylesheetLocation = '_site/css/'
var stylesheetSourceLocation = 'css/'
var stylesheetName = 'main.css'

var jekyllUncss = function () {
  var css = fs.readFileSync(stylesheetLocation + stylesheetName, 'utf8')

  glob('_site/**/*.html', function (err, files) {
    if (err) {
      console.log(err)
    }

    uncss(
      files,
      {
        raw: css,
        ignoreSheets: [/\/css\//]
      },
      function (err, output) {
        if (err) {
          console.log(err)
        }

        fs.writeFileSync(
          stylesheetSourceLocation + 'un.' + stylesheetName,
          output
        )
      }
    )
  })
}

jekyllUncss()
```

Then, run the task `npm run uncss`. The script above assumes the default jekyll CSS structure. If you've customized the CSS location, you will have to modify the `stylesheetLocation`, `sourceStylesheetLocation` and/or `stylesheetName` variables near the top of the script.

Also, I've opted to create a new CSS file from the `uncss` output that's prefixed with `un.` and placed next to the source CSS file. This is intentional, allowing easy integration with Github pages since the new stylesheet will be available after a new jekyll build (allowing the uncss task to be run locally before deploying). However, we need to make sure the new stylesheet is being linked instead of the original, so modify the CSS link in `_includes/head.html`:

```html
<link rel="stylesheet" href="{{ "/css/un.main.css" | prepend: site.baseurl }}">
```

## Conclusion

That's it. Now any unused CSS in `main.css` is removed in `un.main.css` and no longer linked in the built site. This will ensure the smallest possible stylesheet, decreasing download size for your site's visitors.

For example, the default Jekyll CSS is 8.5KB. After running uncss, it's now 5.1KB. That's a 40% decrease.

Source code: https://github.com/e-x-a-m-p-l-e-s/jekyll-uncss-example
