---
layout: post
title: Getting Started with Ember JS Generators
summary: A brief introduction to Yeoman, Grunt, and Bower for the Rails developer.
category: Ember
date: 2014-03-11
path: /ember/2014/03/11/getting-started-with-ember-generators/
---

I was intrigued by the notion of this client-side framework trend, and felt like Ember might be a good fit. The documentation is great, their website is easy on the eyes, and it seemed to be a _very_ opinionated framework. Coming from a Rails background, it sounded familiar. So, I decided to give it a try.

After going through the [Ember tutorial](http://emberjs.com/guides/), I figured I was ready to take on an app with things components filed away in their own compartments, rather than a huge app.js file. Since I'm lazy and used to Rails scaffolding, that meant it was time to track down a generator. [Yeoman](http://yeoman.io) fit the bill perfectly, and is the go-to for the majority of the front end community.

## Get started by generating the Ember app with Yeoman.

First, we need to install npm since Yeoman is an node package.

### Installing npm

Getting the Node package manager is a breeze to install with homebrew:

```bash
$ brew install node
```

Now you will have access to the many goodies in the Node community, one of which we will now install, Yeoman.

### Installing Yeoman

```bash
$ npm install -g yo
```

The `-g` option makes the `yo` command globally accessible, this will come in handy when we run the generators later.

### Installing app generator for Ember

Now it's time to install the ember generator, so we can scaffold out a basic app in a single command, similar to `$ rails new`.

```bash
$ npm install -g generator-ember
```

### Time to generate an example app

First, create a directory and `cd` into it. Yeoman will infer the application name from the name of the directory in which you reside, so keep hat in mind when naming your directory.

```bash
$ mkdir ember-example-tdd && cd ember-example-tdd
```

Now, we can generate apps with a simple command:

```bash
$ yo ember
```

Similarly to Rails Composer, it will ask a few questions about the configuration you prefer, whether you want Twitter Bootstrap or not, etc. Oh, and ascii art.

```
     _-----_
    |       |
    |--(o)--|   .--------------------------.
   `---------´  |    Welcome to Yeoman,    |
    ( _´U`_ )   |   ladies and gentlemen!  |
    /___A___\   '__________________________'
     |  ~  |
   __'.___.'__
 ´   `  |° ´ Y `
```

### What's this thing called Bower?

The app will be scaffolded out, and then `bower install` is run automatically to install any new dependencies. For the Rails folk, it's like `bundler`, but for the front end.

### Using Grunt

Yeoman also installs Grunt and adds a Gruntfile.js. Grunt is similar to `rake`, a way to automate tasks.

```bash
$ grunt test
```

This will run your test suite, which is currently just stubbed out. We will add to it later.

```bash
$ grunt serve
```

This will enable live reload, build the project, open the serve, and open up a browser tab with localhost:9000 in the URL. There are also other tasks included for minifying assets, cleaning assets, watching sass files, etc. We'll get to those in a later post.

## The generated Ember app

The generator essentially leaves us with an `ApplicationRoute`:

```javascript
ExampleEmberTddApp.ApplicationRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue']
  }
})
```

And a template:

```html
<div class="col-md-3">
  <div class="well sidebar-nav">
    <strong>Colors</strong>
    <ul class="list-group">
      {{#each item in controller}}
      <li class="list-group-item">{{item}}</li>
      {{/each}}
    </ul>
  </div>
</div>
<div class="col-md-9">
  {{outlet}}
</div>
```

Awesome. It works, has build tasks, and a test suite stubbed out (the default is mocha). Luckily for us, there's even more:

## Generating a model

We can generate a model in a single command, and specify it's attributes while we're at it.

```bash
$ yo ember:model User firstName:string lastName:string email:string
```

This creates and index at `/#/users`, individual user shows at `/#/users/:user_id`, and an edit action. It also creates some fixture data so we can ensure everything is working as intended.

## That's not all, either.

See the [documentation](https://github.com/yeoman/generator-ember) for even more functionality, including view and controller generators.

Just like that, I'm able to develop a reasonable workflow for a framework that I'm still wrapping my head around. Pretty frictionless. Though I believe generators are invaluable during the learning process to see how the framework is intended to function, illustrating their development paradigm.
