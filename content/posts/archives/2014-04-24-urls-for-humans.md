---
layout: post
title: Urls for Humans
summary: Apply persistent, meaningful, human-friendly urls to your Ruby on Rails app without any extra cruft.
tags:
  - ruby-on-rails
date: 2014-04-24
slug: /rails/2014/04/24/urls-for-humans/
---

I think it's vital to have meaningful urls in an application. It gives much needed context to the link because a database ID doesn't have any significance to the end user. In order to address this, I've been using the gem, [friendly_id](https://github.com/norman/friendly_id). It's worked well. Most of the time.

### I've noticed a couple deficiencies:

##### 1. It's unnecessarily complex.

I don't want to mask, patch, or obfuscate the beautiful simplicity of the `@object = Object.find(params[:id])` that we've come to know and love in Rails controllers.

_In most cases, we simply want to add meaning to the ID of the url for end users. We don't want to reinvent it._

##### 2. Slugs aren't persistent.

This aspect is the most frustrating to me. Let's say we want to add a user's name to their profile url with `friendly_id`. It'd require the following code:

_Modifying the model:_

```ruby
class User < ActiveRecord::Base
  extend FriendlyId
  friendly_id :slug_candidates, use: :slugged

  # ...

  def slug_candidates
     [
      :first_name,
      [:first_name, :last_name],
      [:id, :first_name, :last_name]
    ]
  end

  def should_generate_new_friendly_id?
    first_name_changed? || last_name_changed?
  end
end
```

_Modifying the controller:_

```ruby
class UsersController < ApplicationController

  # ...

  private

    def set_influencer
      @influencer = User.friendly.find(params[:id])
    end
end
```

So, let's assume we have a `User` object with `id=1` and `first_name='bob'`. When we link to their profile, the URI is: `domain.com/users/bob`. This is awesome. When Bob decides to send a link to his friends, they receive that url. They can already infer a lot from it:

- It's at `domain.com`
- It's a link to a user
- The user is `bob`

Sounds human interpretable to me. However, what happens when Bob decides that he wants his name to be Robert in the app? He updates his first name, and Friendly Id updates the slug (the indexed table that maps to the user which is used in the `friendly.find`).

Now, Bob's profile url is: `domain.com/users/robert`.

###### What happens to all the `domain.com/users/bob` links?

They now 404. Or, even worse, link to a new user that's assumed the name Bob.

## So, how do we create Urls for Humans?

There's now a gem for that. It's called, coincidentally, [Urls for Humans](https://github.com/johnotander/urls_for_humans).

Urls for Humans is a gem that allows you to apply meaningful names to your Rails application's urls by leveraging what happens under the covers with `Model.find(params[:id])`, `to_i`, and `to_param`. This makes it easy to turn `users/1` to `users/1-john-otander`. So long as the url is prefixed with the model's id (which Urls for Humans ensures), the lookup will happen exactly how we intend it to with a few key benefits:

- Simple, thanks to ActiveSupport.
- Lightweight, weighing in at 20 something lines of added gem code to your Rails app (since ActiveSupport is already a dependency).
- Persistent urls, because changes in the latter portions of a param won't affect it's lookup.
- Did I mention it's simple, yet?

This is a different approach to friendly urls than `friendly_id`'s because it doesn't modify the db queries themselves. The `urls_for_humans` approach essentially allows all urls fitting the form `resource/<id>-<anything else>` to route to `resource/:id` because `to_i` is called on the `id` parameter.

Granted, the urls aren't perfect, because they have the `id-` prefix. But I think it's worth the sacrifice for persistent, human-friendly urls.

## Using Urls for Humans

To use Urls for Humans you need to extend the `UrlsForHumans` module, and call the class method `urls_for_humans`:

```ruby
class User < ActiveRecord::Base
  include UrlsForHumans

  # ...

  urls_for_humans :first_name, :last_name

  # ...
end
```

The `urls_for_humans` method can be a collection of any information that you'd like to include in the url. For example, with the above class we'd result in:

```ruby
u = User.create(first_name: 'John', last_name: 'Otander')

u.to_param
# => '1-john-otander'

u.first_name = nil
u.to_param
# => '1-otander'
```

With this solution, an ActiveRecord object will always produce the correct url throughout the application:

```ruby
link_to user.first_name, user
# => <a href="http://localhost:3000/users/1-john-otander"
```

Additionally, any link that hits the internet will persist because `1-random-content`, `1-other-random-content`, and `1-john-doe` will all route to the same resource.

###### I don't like it when you leverage executable class bodies

That's fine. You can add a method to your model, instead.

```ruby
class User < ActiveRecord::Base
  include UrlsForHumans

  # ...

  def humanly_attrs
    [:first_name, :last_name, :favorite_food]
  end

  # ...
end
```

This will result in `"#{ id }-#{ first_name }-#{ last_name }-#{ favorite_food }"`. Yay.

You can find the gem here: <https://github.com/johnotander/urls_for_humans>
