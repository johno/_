---
layout: post
title: Link With Icon, A Gem
summary: Incorporate links with icons using a fancy helper to ensure readable code.
tags:
  - ruby-on-rails
date: 2013-12-02
slug: /gems/2013/12/02/link-with-icon-gem/
---

## A wrapper for the Rails link_to helper for icons.

Using the traditional `link_to` helper with Rails leaves you with two options for including icons (like [Bootstrap's glyphicons](http://getboostrap.com) or [Font Awesome](http://fontawesome.io/)) in the link text:

```html+erb
<!-- Using embedded html with html_safe -->
<%= link_to "<i class="icon-login"></i> Login".html_safe, login_path, class:
:some_class %>

<!-- Passing a block -->
<%= link_to login_path, class: :some_class do %>
<i class="icon-login"></i> Login <% end %>
```

Functional as they are, it starts to get a little messy in a long navigational list, thus making it quite difficult to read.

So, I decided why not wrap it?

```ruby
module LinkWithIcon

  def link_with_icon(icon_class = nil, name = nil, options = nil, html_options = nil, &block)
    link_to("#{ icon(icon_class) }#{ name }".html_safe, options, html_options, &block)
  end

  private

  def icon(icon_class)
    "<i class='icon-#{ icon_class }'></i>"
  end
end
```

The result is a nice little module that cleans up one's view code immensely:

Using `link_with_icon` is as simple as pie:

```html+erb
<%= link_with_icon(:globe, 'A Link!', root_path) %> # =>
<a href="/"><i class="icon-globe"></i>A Link!</a>
```

It can handle all the normal options of the Rails `link_to` helper, but it also takes a parameter for the icon that you will be using in the link.

```html+erb
<%= link_with_icon(:arrow, 'Click Me', another_awesome_path, onclick:
'alert("things");') %> # =>
<a href="/awesome" onclick="alert('lol');"
  ><i class="icon-arrow"></i>Click Me</a
>
```

I also put it in a gem which is on [Github](https://github.com/johnotander/link_with_icon) and available on [Rubygems](http://rubygems.org/gems/link_with_icon).
