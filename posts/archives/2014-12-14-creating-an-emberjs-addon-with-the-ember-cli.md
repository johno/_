---
layout: post
title: Creating an Ember.js Addon with the Ember CLI
summary: Thanks to the power of the Ember CLI, reusing code and functionality between apps has never been easier.
category: ember
date: 2014-12-14
path: /ember/2014/12/14/creating-an-emberjs-addon-with-the-ember-cli
---

Thanks to the power of the Ember CLI, reusing code and functionality between apps has never been easier. To
get an idea of the addons that already exist in this ecosystem, check out <http://emberaddons.com>. At the
time of writing this, there are already more than 400 addons listed. Many of which can drastically help
you cut down on development time. So, let's get started!

For this example, we will be creating an Ember CLI addon for the [remarkable](https://github.com/jonschlinkert/remarkable)
markdown library. We will create a Handlebars helper and an Ember component which will be able to be
used in Ember CLI apps that install the addon.

## Getting started

In order to get started you will need the following dependencies to be installed:

- [node](http://nodejs.org/)
- [npm](https://www.npmjs.org/)
- [bower](http://bower.io)
- [ember-cli](http://www.ember-cli.com)

## Generating the addon skeleton

The Ember CLI provides an addon generator so you can create the addon skeleton, including tests,
with the following command:

```
ember addon <your-addon-name>
```

For the purposes of this example, I will create the `ember-remarkable` addon with:

```
ember addon ember-remarkable
```

This will install all npm and bower dependencies, and create the necessary scaffold to begin
implementing your addon. Now, to ensure everything is working as expected, you can run the initial
tests, which consist of jshinting, with:

```
ember t
```

Your output should resemble:

```
ember-remarkable [master] % ember t
version: 0.1.2
Built project successfully. Stored in "/Users/johno/code/ember/ember-remarkable/tmp/class-tests_dist-vfl3qTwU.tmp".
ok 1 PhantomJS 1.9 - JSHint - .: app.js should pass jshint
ok 2 PhantomJS 1.9 - JSHint - dummy/tests/helpers: dummy/tests/helpers/resolver.js should pass jshint
ok 3 PhantomJS 1.9 - JSHint - dummy/tests/helpers: dummy/tests/helpers/start-app.js should pass jshint
ok 4 PhantomJS 1.9 - JSHint - dummy/tests: dummy/tests/test-helper.js should pass jshint
ok 5 PhantomJS 1.9 - JSHint - .: router.js should pass jshint

1..5
# tests 5
# pass  5
# fail  0

# ok
```

Now that everything is in order, we need to add the remarkable library.

## Adding a bower dependency

In order to add a bower dependency, we need to create an addon
[blueprint](http://www.ember-cli.com/#generators-and-blueprints) that installs the dependency:

```
ember g blueprint ember-remarkable
```

This will create the file `blueprints/ember-remarkable/index.js` which is where we can introduce the remarkable
dependency. Throughout the build process with the Ember CLI, there are numerous hooks that are introduced. For
this addon, we want to tie into the `afterInstall` hook, which is executed when the blueprint generator is run
after the addon is installed as an npm dependency in an Ember CLI app.

To create the hook and add the remarkable depdendency, we can modify `blueprints/ember-remarkable/index.js`
like so:

```javascript
'use strict'

module.exports = {
  normalizeEntityName: function() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  afterInstall: function() {
    return this.addBowerPackageToProject('remarkable')
  }
}
```

### Specify the blueprint path

We can modify the project root's `index.js` to specify what path to use for the blueprint:

```javascript
'use strict'

var path = require('path')

module.exports = {
  name: 'ember-remarkable',

  blueprintsPath: function() {
    return path.join(__dirname, 'blueprints')
  }
}
```

Note that the `blueprints` path is the default. Now, when this addon is installed in an Ember
app, the blueprint can be run with:

```
ember g ember-remarkable
```

#### Update 1/21/2015

Now, the blueprints will automatically be run when the addon is installed via:

```
ember install:addon ember-remarkable
```

And, the remarkable bower package will be installed automatically. Awesome!

### Import the Javascript file

Now that the bower package is being installed, we need to import the Javascript file into our addon. This
can be done in the addon root's `index.js`:

```javascript
'use strict'

var path = require('path')

module.exports = {
  name: 'ember-remarkable',

  blueprintsPath: function() {
    return path.join(__dirname, 'blueprints')
  },

  included: function(app) {
    this._super.included(app)
    this.app.import(app.bowerDirectory + '/remarkable/dist/remarkable.js')
  }
}
```

Now, the addon will import the remarkable Javascript into the Ember CLI app.

## Creating a helper

In order to generate a helper, you can run the following Ember CLI command:

```
ember g helper md-remarkable
```

This will create the helper with a test file. However, the helper is created in `app/helpers`, which
isn't where we want the helper to be located. We want to keep the helper in the `addon/helpers` directory.
This ensures that the helper doesn't stomp on anything defined by the user.

So, we will have to move the `helpers` directory with `mv app/helpers addon`.

### Testing the helper

We can use a Qunit equality test to ensure that the markdown string is being turned into the correct
HTML equivalent.

```javascript
import { mdRemarkable } from 'ember-remarkable/helpers/md-remarkable'

module('MdRemarkableHelper')

test('it correctly converts markdown to html', function() {
  var result = mdRemarkable('# This should be a h1')
  equal(result.toString().trim(), '<h1>This should be a h1</h1>')
})
```

You can verify that the test is failing with `ember t`.

### Implementing the helper

Using the Remarkable API, we can convert markdown being passed to the helper into
HTML with the following:

```javascript
import Ember from 'ember'

export function mdRemarkable(markdownInput) {
  var md = new Remarkable()
  return new Ember.Handlebars.SafeString(md.render(markdownInput))
}

export default Ember.Handlebars.makeBoundHelper(mdRemarkable)
```

Now, you can run the tests with `ember t` and see that the test is passing, however, the linting tests
are now failing because we are implicitly calling the `Remarkable` constructor, and jshint doesn't know
that it is globally accessible.

```
not ok 4 PhantomJS 1.9 - JSHint - ember-export-application-global/helpers: ember-export-application-global/helpers/md-remarkable.js should pass jshint
    ---
        actual: >
            null
        message: >
            ember-export-application-global/helpers/md-remarkable.js should pass jshint.
            ember-export-application-global/helpers/md-remarkable.js: line 5, col 16, 'Remarkable' is not defined.

            1 error
        Log: >
    ...
```

The easy fix is to modify the `.jshintrc` to make ignore the global assumption, however, we can also create a shim
to mimic ES6 functionality. The latter is the preferred route.

#### Creating a shim

First, we need to create a vendor file since that will be automatically merged into the app:

```
mkdir vendor/ember-remarkable
touch vendor/ember-remarkable/shim.js
```

Now we can create the shim:

```javascript
/* globals Remarkable */

define('remarkable', [], function() {
  'use strict'

  return {
    default: Remarkable
  }
})
```

This defines an ES6 shim so that we can leverage the `import Remarkable from 'remarkable'` ES6
import syntax. However, we aren't quite done yet because we need to import the shim into the app,
so you will need to modify your `index.js` to the following:

```javascript
'use strict'

var path = require('path')

module.exports = {
  name: 'ember-remarkable',

  blueprintsPath: function() {
    return path.join(__dirname, 'blueprints')
  },

  included: function(app) {
    this._super.included(app)
    this.app.import(app.bowerDirectory + '/remarkable/dist/remarkable.js')
    this.app.import('vendor/ember-remarkable/shim.js', {
      type: 'vendor',
      exports: { remarkable: ['default'] }
    })
  }
}
```

This still leaves `Remarkable` in the global scope, attached to the `window`, however we get to
leverage module `import`s, which will allow us to future-proof this implementation and avoid
modifying the jshinting.

Now, we can import the module in the helper file:

```javascript
import Ember from 'ember'
import Remarkable from 'remarkable'

export function mdRemarkable(markdownInput) {
  var md = new Remarkable()
  return new Ember.Handlebars.SafeString(md.render(markdownInput))
}

export default Ember.Handlebars.makeBoundHelper(mdRemarkable)
```

And, if we run the tests again, everything passes!

## Creating the initializer

The Ember CLI has our backs again with a blueprint for initializers.

```
ember g initializer ember-remarkable
```

Here, we can import the addon helper and register it as a Handlebars helper:

```javascript
import Ember from 'ember'
import { mdRemarkable } from 'ember-remarkable/helpers/md-remarkable'

export function initialize(/* container, application */) {
  Ember.Handlebars.helper('md', mdRemarkable)
}

export default {
  name: 'ember-remarkable',
  initialize: initialize
}
```

This will register the helper, but allow the app to override the addon if they so choose.

## Implementing a component

The CLI provides us with a nice generator for components which we can leverage here:

```
ember g component md-text
```

This will generate a component, `app/components/md-text.js`, and its template, `app/templates/components/md-text.hbs`.

### Importing from the addon directory

Similarly to what we did with the helper, we want to move the component to the `addon` directory so that
it allows the addon to be overridden.

We can do that with:

```
cp -r app/components addon
```

Then, in `app/components/md-text`, we can import the addon.

```javascript
import mdText from 'ember-remarkable/components/md-text'

export default mdText
```

### Implementing the component

_Note:_ This post will gloss over components and how they work in Ember. If you'd like to dive deeper
into Ember Components please visit: <http://emberjs.com/guides/components/>.

Firstly, we will define a few properties: `text`, `typographer`, and `linkify`. These will be options
that can be passed into the component `{{ "{{md-text text=someText linkify=true" }}}}`.

We also add a few computed properties for the `parsedOptions` and `buildOptions` and are left with the
following in `app/components/md-text.js`:

```javascript
import Ember from 'ember'
import Remarkable from 'remarkable'

export default Ember.Component.extend({
  text: '',
  typographer: false,
  linkify: false,

  parsedMarkdown: function() {
    var md = new Remarkable(this.get('buildOptions'))
    var html = md.render(this.get('text'))

    return new Ember.Handlebars.SafeString(html)
  }.property('text'),

  buildOptions: function() {
    return {
      typographer: this.get('typographer'),
      linkify: this.get('linkify')
    }
  }.property('typographer', 'linkify')
})
```

Then, we ensure that `parsedMarkdown` is being displayed in the template.

`app/components/templates/md-text.hbs`

```handlebars
{{ "{{parsedMarkdown" }}}}
```

### Test the component

#### Use the dummy app for a sanity test

The Ember CLI uses a dummy app in `tests/dummy` for testing. This is actually quite helpful for
using as a sanity testing mechanism, too. In `tests/dummy/app/templates/application.hbs` you can put
calls to both the helper and component:

```handlebars
{{ "{{md '# Markdown!'" }}}}
{{ "{{md-text text='# Markdownnnnnn \n http://google.com' linkify=true" }}}}
```

Then, with `ember serve`, you can navigate to `localhost:4200` to ensure that everything is working
as expected.

#### Unit tests

A unit testing file was automatically created by the generator when we created the component. So,
we are ready to get started.

Firstly, we can add a rendering test to ensure that the component is correctly rendered to the page:

```javascript
test('it renders', function() {
  // creates the component instance
  var component = this.subject()
  equal(component._state, 'preRender')

  // appends the component to the page
  this.append()
  equal(component._state, 'inDOM')
})
```

Then, we want a test to make sure the proper text was displayed to the page:

```javascript
test('it displays text', function() {
  var component = this.subject()
  component.set('text', '# Markdown is fun')

  var $component = this.append()
  equal($component.text().trim(), 'Markdown is fun')
})
```

And lastly, we want to make sure that we are calling remarkable correctly, and resulting in HTML:

```javascript
test('it properly parses the markdown', function() {
  var component = this.subject()
  component.set('text', '# Markdown is fun')

  var $component = this.append()
  equal($component.find('h1').length, 1)
})
```

We result in the following:

```javascript
import Ember from 'ember'

import { moduleForComponent, test } from 'ember-qunit'

moduleForComponent('md-text', 'MdTextComponent', {
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
})

test('it renders', function() {
  // creates the component instance
  var component = this.subject()
  equal(component._state, 'preRender')

  // appends the component to the page
  this.append()
  equal(component._state, 'inDOM')
})

test('it displays text', function() {
  var component = this.subject()
  component.set('text', '# Markdown is fun')

  var $component = this.append()
  equal($component.text().trim(), 'Markdown is fun')
})

test('it properly parses the markdown', function() {
  var component = this.subject()
  component.set('text', '# Markdown is fun')

  var $component = this.append()
  equal($component.find('h1').length, 1)
})
```

Running the tests with `ember t` should show passing tests. Yay.

## Conclusion

As one can see, the Ember CLI is an unbelievably powerful tool. Its adoption of convention over configuration
makes it relatively trivial to break application logic into standalone addons for sharing among applications.
It's also beneficial because an addon is an easily digestible collection of logic that can be tested
and extended upon in isolation. In my opinion, this leads to developer happiness.

The source code for this post can be found here: <https://github.com/johnotander/ember-remarkable>.

Thanks for reading.
