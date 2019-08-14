---
layout: post
title: Convention Over Configuration
summary: A thought piece on why I think convention over configuration is a good thing.
category: ember
date: 2015-02-03
path: /ember/2015/02/03/convention-over-configuration/
---

The phrase "convention over configuration" may as well be a buzzword, especially in the recent
past. It's typically perpetuated as a myth by its detractors, and as gospel by its dogmatic followers.
Most developers and software engineers typically have an affinity to one side or the other. I'm no
different.

I like convention.

I believe there is enormous value in conventions. In most contexts, established conventions ease
collaboration and ensure that developers are focused on solving the problem at hand. When everyday
development trivialities are offloaded from the hands of software teams and handled by the greater
community, productivity ensues.

## A community will establish a better set of best practices and paradigms than any single software team.

This productivity results from a few characteristics I've observed:

### Cognitive overhead is reduced

When a developer doesn't have to think about trivial decisions, like where a file should go, what glue
code to write, or what database migration tool to use, they can focus on the problem at hand.

If certain aspects of a framework are implicit rather than explicit, glue code and boilerplate are
dramatically reduced. Yes, this directly violates the [Zen of Python](https://www.python.org/dev/peps/pep-0020/),
however, the real problems in your domain become _more_ explicit. When assumptions are made in
regards to project structure, variable naming, etc., your business logic floats to the surface.

### Opinionated is good

This means that defaults are sensible, and made for you. If they're the result of the greater community,
they're most likely the correct foundation for the majority. If the defaults are not sensible for
your situation, you probably already know that. Configure them.

Being opinionated ensure a particular set of conventions, defaults, and requirements. This coincidentally
aids in code reuse, because modules can be absorbed into other projects without any additional config.
That's a _huge_ win.

### CLI tools and generators remove boilerplate

This is one of the most productive aspects. When a community has defined an opinionated and established
convention, CLI tools and generators can take care of a lot of the associated boilerplate for solving
a particular problem. I believe CLI tools, in particular, especially when tied to a framework, are
productivity machines.

The command line, just like your text editor, is expressive. A command line tool tied into your development
environment can almost read your mind. For example, let's say that I want a component in an Ember
app. That means I need a few things:

- Component Javascript file
- A template
- A test file
- This test to be tied into the testing infrastructure
- The component Javascript to be tied into my app
- The template to be added to my index.html

The Ember CLI generator, as a result of established convention, knows how to do exactly that:

```
ember g component foo-bar
installing
  create app/components/foo-bar.js
  create app/templates/components/foo-bar.hbs
installing
  create tests/unit/components/foo-bar-test.js
```

This allows me to focus on the more important tasks at hand, like naming things. <3.

### A lack of flexibility is a good thing

If there's only one way to do something, everyone will do it that way. This ensures that as a
project snowballs into a 1,000+ file monolith, each related problem was solved in the same way.
Often times, convention and inflexibility cut down on clever solutions. Your domain logic becomes
more explicit because superfluous noise has disappeared (it's all implicit).

## Because DRY isn't always good

If you aren't wasting time rewriting boilerplate over and over, you're less likely to refrain
from repeating yourself when you should. Yes, sometimes it is appropriate to repeat yourself.
For example, controllers. Please. Repeat. Yourself. If it's not business logic,
or easily abstracted into a service, you can do it, I promise.

### Onboarding is simplified

We all know the secret tool for developers is Google. Conventions make it easier for new members
on a project consult with the community (Github, Stackoverflow, Framework documentation) when running
into hurdles along the way. I believe it was Yehuda Katz that said (paraphrased):

> Frameworks and conventions are for the next developer.

I think there's a lot of truth to that.

## Convention isn't everything

After going on and on about convention, I don't believe in convention just for the sake of convention.
Convention is a valuable tool, but it's a means to an end. The end is a working, tested piece of software.
The end is an ecosystem where developers are productive and happy. It is paramount that established convention
can be easily extended when necessary. But, like what DHH wrote in
[Rails is omakase](http://david.heinemeierhansson.com/2012/rails-is-omakase.html) they should be
rare, substitutions that vary on context.

When you need that substitution, you'll know. But, until then, I'd like to focus on writing
code rather than configuration.

Just my two cents.
