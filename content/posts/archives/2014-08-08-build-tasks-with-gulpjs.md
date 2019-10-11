---
layout: post
title: Build Tasks with Gulp.js
summary: Gulp.js is a streaming build system. Their API is lean, simple, and a delight to use. In this post I've outlined how Gulp works and how I use it in my everyday workflow.
tags:
  - gulp
date: 2014-08-08
slug: /front-end-development/2014/08/08/build-tasks-with-gulpjs/
---

After some experimentation with both Gulp and Grunt, I've found the former to be preferable. After all, Gulp was able to learn from Grunt's mistakes, and in doing so they made changes to the API to make it more user friendly. Paraphrased from [gulpjs.com](http://gulpjs.com): Their strict plugin guidelines ensure that [plugins](http://gulpjs.com/plugins/) are simple and only serve one particular task. The API surface is also small, making it easier to learn. Not to mention that the concept of "streams" and "piping" is much more intuitive and easy to picture as you construct your tasks that may have multiple steps involved. The best part of all, the use of streams avoids disk writes until the task is complete.

### Installing Gulp

_Gulp uses Node, so if you don't have it installed, you can do so [here](http://howtonode.org/how-to-install-nodejs) or [here](https://blog.udemy.com/node-js-tutorial/)_

Once Node is installed, you have access to the Node Package Manager, `npm`:

```
$ npm install -g gulp
```

### Incorporating Gulp into your project

Firstly, let's assume you have the following structure:

```
src/
  scss/
  js/

dist/
  css/
    c.min.css
  js/
    j.min.js

index.html
```

The `src` directory is used for development, and we want to create a build task that does some work to the `.scss` and `.js` files, and puts the results into the `dist` folder (which will be used in production).

#### Initialize the `package.json` file

The first step is to initialize the `package.json` file:

```
$ npm init
```

#### Installing `gulp`

```
$ npm install --save-dev gulp
```

#### Create and run a `gulpfile.js`

First, let's add the file.

```
$ touch gulpfile.js
```

Then add a default task, even though it won't do anything yet because we haven't installed any plugins:

`gulpfile.js`

```javascript
var gulp = require('gulp')

gulp.task('default', function() {})
```

Now we can run `$ gulp` from the project directory, and we will get the following output:

```
gulp-example|||master* $ gulp
[13:58:28] Using gulpfile ~/code/gulp/gulp-example/gulpfile.js
[13:58:28] Starting 'default'...
[13:58:28] Finished 'default' after 60 μs
```

It's time to add some tasks.

### Building SCSS for distribution

For this example, I copied the SCSS from [BASSCSS](http://basscss.com) so there's something to prep for production (and BASSCSS is awesome).

In a typical build, we want to complete the following tasks:

1. Compile SCSS to CSS.
2. CSS Linting.
3. Autoprefixing.
4. Concatenate all CSS files into one.
5. Minify the CSS.
6. Rename the file for production.

In order to complete these tasks, we need to install the gulp plugins, and add them to the default task. Luckily we can install the gulp packages in one command:

```
npm install gulp-sass gulp-csslint gulp-autoprefixer gulp-concat gulp-minify-css gulp-rename --save-dev
```

Now that they're installed, we need to require them in the `gulpfile.js`:

```javascript
var gulp = require('gulp')
var sass = require('gulp-sass')
var concat = require('gulp-concat')
var rename = require('gulp-rename')
var cssmin = require('gulp-minify-css')
var csslint = require('gulp-csslint')
var prefix = require('gulp-autoprefixer')
```

Then, we add a new task called 'scss' and add it to the default task list:

```javascript
gulp.task('scss', function() {})

gulp.task('default', ['scss'])
```

It's possible to run the scss task individually with `$ gulp scss`, though if it's something you will always run you can add it to the default list. This will ensure that it is run with `$ gulp`.

If we run `$ gulp` we get the following output:

```
gulp-example|||master* $ gulp
[14:22:54] Using gulpfile ~/code/gulp/gulp-example/gulpfile.js
[14:22:54] Starting 'scss'...
[14:22:54] Finished 'scss' after 285 ms
[14:22:54] Starting 'default'...
[14:22:54] Finished 'default' after 9.15 μs
```

#### Adding some functionality to the scss task

Firstly, we want to grab the scss using the `src` function that gulp provides, and then give it the `dist` destination:

```javascript
gulp.task('scss', function() {
  return gulp.src('src/scss/basscss/basscss.scss')
    .pipe(gulp.dest('dist/css'));
```

If you were to run this, it would copy the `basscss.scss` file and place it in `dist/css`. The `src()` function is reading in the file and creating a stream, which is piped to the `dest()` function. The `dest()` function grabs what's in the stream and writes it to a file whose location is determined by the given parameter.

Then we want to pipe it to the `sass` and `rename` plugins, so that it will compile the SCSS to CSS and then rename the file:

```javascript
gulp.task('scss', function() {
  return gulp
    .src('src/scss/basscss/basscss.scss')
    .pipe(sass())
    .pipe(rename('c.css'))
    .pipe(gulp.dest('dist/css'))
})
```

In this scenario, we add two more pipes that modify the stream. First the stream, which is currently SCSS, is compiled into CSS. Then it's renamed to `c.css` and then handed off to the `dest()` function.

Now, let's throw in the other tasks that we listed off before:

```javascript
gulp.task('scss', function() {
  return gulp
    .src('src/scss/basscss/basscss.scss')
    .pipe(sass())
    .pipe(prefix('last 1 version', '> 1%', 'ie 8'))
    .pipe(csslint())
    .pipe(cssmin())
    .pipe(rename('c.min.css'))
    .pipe(gulp.dest('dist/css'))
})
```

Now, we've added autoprefixing, linting, and minification. Running `$ gulp` will result in a production ready CSS file `dist/css/c.min.css`.

The completed `gulpfile.js`:

```javascript
var gulp = require('gulp')
var sass = require('gulp-sass')
var concat = require('gulp-concat')
var rename = require('gulp-rename')
var cssmin = require('gulp-minify-css')
var csslint = require('gulp-csslint')
var prefix = require('gulp-autoprefixer')

gulp.task('scss', function() {
  return gulp
    .src('src/scss/basscss/basscss.scss')
    .pipe(sass())
    .pipe(prefix('last 1 version', '> 1%', 'ie 8'))
    .pipe(csslint())
    .pipe(cssmin())
    .pipe(rename('c.min.css'))
    .pipe(gulp.dest('dist/css'))
})

gulp.task('default', ['scss'])
```

### Building JS for distribution

In order to jslint and uglify, we need install a few more plugins and require them in the `gulpfile.js`:

```
$ npm install gulp-uglify gulp-jshint --save-dev
```

```javascript
var jshint = require('gulp-jshint')
var uglify = require('gulp-uglify')
```

Then, similarly to the 'scss' task, we need to create a 'js' task and pipe in our plugins:

```javascript
gulp.task('js', function() {
  return gulp
    .src('src/js/**/*.js')
    .pipe(jshint())
    .pipe(concat('j.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
})
```

This task grabs all the `.js` files in the `src/js` directory, jslints them, concatenates them into one file, and then uglifies the resulting file. Then we are left with a production ready javascript file in the at `dist/js/j.min.js`.

Lastly, we just need to add the 'js' task to the default task list. We are left with a `gulpfile.js` that's ready to go:

```javascript
var gulp = require('gulp')
var sass = require('gulp-sass')
var concat = require('gulp-concat')
var rename = require('gulp-rename')
var cssmin = require('gulp-minify-css')
var csslint = require('gulp-csslint')
var prefix = require('gulp-autoprefixer')
var jshint = require('gulp-jshint')
var uglify = require('gulp-uglify')

gulp.task('scss', function() {
  return gulp
    .src('src/scss/basscss/basscss.scss')
    .pipe(sass())
    .pipe(prefix('last 1 version', '> 1%', 'ie 8'))
    .pipe(csslint())
    .pipe(cssmin())
    .pipe(rename('c.min.css'))
    .pipe(gulp.dest('dist/css'))
})

gulp.task('js', function() {
  return gulp
    .src('src/js/**/*.js')
    .pipe(jshint())
    .pipe(concat('j.min.js'))
    .pipe(gulp.dest('dist/js'))
})

gulp.task('default', ['scss', 'js'])
```

The source code for this example is available on Github: <https://github.com/johnotander/gulpfile-example>.

## Further Reading:

- <http://travismaynard.com/writing/getting-started-with-gulp>
- <https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#getting-started>
- <http://www.sitepoint.com/introduction-gulp-js/>
- <https://www.codefellows.org/blog/quick-intro-to-gulp-js>
