---
layout: post
title: Strong Parameters with Rails 4
summary: I think Strong Parameters are the best thing for Rails since sliced bread. Here's why.
category: Rails
date: 2014-03-08
path: /rails/2014/03/08/strong-parameters-with-rails-4/
---

I'm an advocate of strong parameters in Rails 4, they're a long-awaited upgrade to the `attr_accessible`/`attr_protected` whitelist/blacklist paradigm that exists in the prior versions of Rails to restrict mass assignment. In Rails, a mass assignment occurs when the `update_attributes` method is called on a model and an `ActiveModel::MassAssignmentSecurity::Error` error is raised if a protected attribute is attempted to be mass assigned.

### In the model? That doesn't sound MVC.

It isn't. These types of restrictions shouldn't exist on the model layer, their rightful place resides in the controller. The controller should be dealing with authorization and authentication, and parameters are integrally related with authenticating and authorizing actions in your application. After all, the controller is the gatekeeper.

### Blacklisting makes it too easy to make mistakes, very devastating mistakes.

This method(using `attr_protected`) is likely the worst of all because newly added attributes to the model are exposed to mass assignment by default. This can become extremely problematic because it's something that can be easily overlooked as there are more developers on a project, and the complexity increases. Whenever it comes to applications with sensitive information, it's imperative to default to the side of paranoia, which is why blacklisting is typically the incorrect solution for gatekeeping data.

Let's say we need a new token column in the user table that's used for some third party integration, a typical approach would include the following steps.

##### Create the column

```bash
$ rails g migration add_token_to_users token && rake db:migrate
```

##### Create the spec

```ruby
require 'spec_helper'

describe User do

  # ...

  describe '.do_stuff_with_token' do

    it 'should do stuff' do
      # ...
    end
  end
end
```

##### Add the method to add the intended functionality in the User model

```ruby
class User < AR::Base

  # ...

  attr_protected :id, :other, :things

  # ...

  def do_stuff_with_token
    # ...
  end
end
```

That's it right? Unfortunately not. Without adding `attr_protected :token`, we've left the token accessible to mass assignment. If an attacker knew the column name, a simply crafted `PUT` can manipulate that internal value that the end user shouldn't have access to.

```bash
  curl -X PUT -d "user[token]=something_else" https://insecure.com/users/user_id
```

This can become quite problematic because exposure to authorization sensitive attributes in models, like roles/tokens/etc. can easily provide an attack vector.

Not to mention the fact that the [Github vulnerability](https://github.com/blog/1068-public-key-security-vulnerability-and-mitigation) _may_ have been avoided if this were a controller-level application of trust.

### Whitelisting attributes in the model lacks flexibility

Often times, certain attributes will be accessible in some contexts, but not others. For example, an admin may be able to update all attributes of a user, but a mortal user cannot. This makes the `attr_accessible :stuff, as: :admin` context switching in the model begin to develop a whole new kind of code smell. It's also relatively closed off to further abstraction and context switching.

### Strong parameters to save the day

Strong parameters is really just another implementation of attribute whitelisting. However, it's use as a private method in the relevant controller, with explicit parameter permissions makes it a much better implementation. It's a proper separation of concerns, because the gatekeeping of parameters is occurring in the controller, where it should be. This also makes it easy to allow different sets of parameters by defining different methods based on role.

```ruby
def user_params
  #...
end

def admin_params
  # ...
end
```

##### But, it gets even better.

Now, other data structures must be defined _in_ the params method. So, if you are accepting a `tag_list`, you have to tell it to expect an array, otherwise it won't be permitted.

```ruby
  def image_params
    params.require(:image).permit(:data_file, :description, :name,
                                  category_ids: [], tag_list: [])
  end
```

This is preferable because it gives you even more control of the data that you're allowing to be updated in your controller.

Strong parameters is a much awaited change in the default Rails package which is more secure out of the box, and is properly comparmentalized, which allows an avenue for proper abstraction for developers. Now I no longer have to roll my own for each Rails app I work on. Yay.
