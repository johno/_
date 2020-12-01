---
layout: post
title: Decorators on Rails
summary: After giving a lightning talk on Decorators on Rails, I figured the slides needed an accompanying blog post.
tags:
  - ruby
  - ruby-on-rails
date: 2014-03-07
slug: /rails/2014/03/07/decorators-on-rails/
---

This is the blog post for an equivalently titled lightning talk I gave for a [localmotion #brewby](http://localmotion.io). The slides can be found [here](http://johnotander.com/decorators_on_rails).

Decorators can be useful for cleaning up view logic and models in a Rails application. The [Draper gem](https://github.com/drapgergem/draper) makes it essentially seamless to integrate, resulting in a more maintainable codebase that's easier to ensure full test coverage and happy developers.

## What is a decorator?

The decorator pattern is a design pattern that allows behavior to be added to an individual object without affecting the behavior of other objects from the same class.

This is useful because we can add additional behavior to an instantiated model, like `@user`, before passing it on to the template from the controller. However, in other contexts, the User model, doesn't have the added behavior that's the result of the decoration. This helps to separate concerns, while still adding necessary functionality to an object when appropriate.

## Why do we care?

<div class="message">
  Your views should be stupid.
</div>

I like to use the analogy that views should read similarly to a shopping list. There shouldn't be any complexity or logic. It should read similarly to:

- Email
- Name
- Joined date
- Favorite color

However, I'll be the first to admit, that Rails views don't often look like that. _At all_. It's usually closer to a Magical Realism novel. When an app is still in it's initial iterations of development, this isn't always the worst thing in the world, either. Sometimes you just need to get something shipped in order to see if it's even worth refactoring.

Once you've found your niche, or the codebase and functionality stabilize, it might become worthwhile to begin considering the decorator pattern more seriously.

As Steve Klabnik eloquently stated:

> The whole idea of logic in templates leads to all kinds of problems. They're hard to test, they're hard to read, and it's not just a slippery slope, but a steep one. Things go downhill rapidly.

## A disclaimer

Typically in prototyping, expediency wins. So, it's not usually advisable to start incorporating the decorator pattern in early stage apps. Your views and models should be growing rapidly, and bursting at the seams before you consider utilizing Draper. The Decorator/Presenter pattern should be treating painful symptoms like complex views and unmaintainable models, rather than prematurely accounting for them.

## A fairly typical view

```html+erb
<h1>Show user</h1>

<dl class="dl-horizontal">
  <% if @user.public_email %>
  <dt>Email:</dt>
  <dd><%= @user.email %></dd>
  <% else %>
  <dt>Email Unavailable:</dt>
  <dd><%= link_to 'Request Email', '#', class: 'btn btn-default btn-xs' %></dd>
  <% end %>

  <dt>Name:</dt>
  <dd>
    <% if @user.first_name || @user.last_name %> <%= "#{ @user.first_name } #{
    @user.last_name }".strip %> <% else %> No name provided. <% end %>
  </dd>

  <dt>Joined:</dt>
  <dd><%= @user.created_at.strftime("%A, %B %e") %></dd>

  <!-- ... -->
</dl>
```

As I've said before, I like my views to read similarly to a shopping list. It lists off the information without any extra cruft. However, the view above doesn't exactly do that. The first place to start refactoring would typically involve moving the view logic into helpers and the User model. That way, at least the view itself will read easily.

Though this approach begins to muddy up your concerns. String formatting of a model's attributes doesn't belong in a helper because it's data sensitive, but it doesn't belong in the model because it isn't business logic. This is where the decorator comes in. When view logic doesn't exactly belong here nor there, it could be appropriate to be delegated to a decorator.

This ensures ease of testing, because you can focus on only view related logic in your decorator. Which means succinct, pertinent specs in one file, creating more relevant documentation and promoting developer happiness.

## Getting set up with Draper

You know the drill, add it to your gem file.

```ruby
gem 'draper'
```

Then, install and run the generator for the model you'd like to decorate.

```bash
$ bundle install
$ rails generate decorator User
```

#### The default decorator.

Now, after the generator, there's a happy place for all the decorators. This helps to keep your different app components separate, which is especially useful as the complexity increases. The generated `UserDecorator` can be found in app/decorators/user_decorator.rb

```ruby
class UserDecorator < Draper::Decorator
  delegate_all
end
```

#### Adding some specs.

Let's make some red F's before we begin adding our new decorator functionality.

```ruby
require 'spec_helper'

describe UserDecorator do

  let(:first_name)  { 'John'  }
  let(:last_name)  { 'Smith' }

  let(:user) { FactoryGirl.build(:user,
                                 first_name: first_name,
                                 last_name: last_name) }

  let(:decorator) { user.decorate }

  describe '.fullname' do

    #...

    context 'with a first and last name' do

      it 'should return the full name' do
        expect(decorator.full_name).to eq("#{ first_name } #{ last_name }")
      end
    end

    context 'without a first or last name' do

      before do
        user.first_name = ''
        user.last_name = ''
      end

      it 'should return no name provided' do
        expect(decorator.full_name).to eq('No name provided.')
      end
    end

    # ...

  end
end
```

Now, we just need to implement the decorator:

```ruby
class UserDecorator < Draper::Decorator
  delegate_all

  def email_or_request_button
    public_email ? email : h.link_to('Request Email', '#', class: 'btn btn-default btn-xs').html_safe
  end

  def full_name
    if first_name.blank? && last_name.blank?
      'No name provided.'
    else
      "#{ first_name } #{ last_name }".strip
    end
  end

  def joined_at
    created_at.strftime("%B %Y")
  end
end
```

Note the `h` is used to access view helpers, if you'd like to avoid that you can include the lazy helper module:

```ruby
include Draper::LazyHelpers
```

#### Implementing the controller.

Now, you just need to call `.decorate` on any `ActiveRecord` object. Additionally, in Rails 4 you can call `.decorate` on a collection because it returns an `ActiveRecord::Relation` rather than an array. With Rails 3 you can decorate a collection with: `UserDecorator.decorate_collection(User.all)`.

```ruby
class UsersController < ApplicationController
  before_action :do_stuff

  # GET /users
  # GET /users.json
  def index
    @users = User.all.decorate
  end

  # GET /users/1
  # GET /users/1.json
  def show
    @user = User.find(params[:id]).decorate
  end
end
```

## The result

A sexy, terse view.

```html+erb
<h1><%= @user.full_name %></h1>

<dl class="dl-horizontal">
  <dt><%= @user.email_attr_text %></dt>
  <dd><%= @user.email_or_request_button %></dd>

  <dt>Name:</dt>
  <dd><%= @user.full_name %></dd>

  <dt>Joined:</dt>
  <dd><%= @user.joined_at %></dd>

  <!-- ... -->
</dl>
```

Now, we've got a beautiful view, separated concerns, and specs that are easy to follow. Let's dance.

[The source code in an example Rails app](https://github.com/johnotander/draper_example).
