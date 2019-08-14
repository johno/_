---
layout: post
title: Validating Presence with Nested Attributes in Ruby on Rails
summary: The standard validates_presence_of keyword doesn't play nicely with nested attributes, however inverse_of does.
category: Rails
date: 2013-01-12
path: /rails/2013/01/12/validating-presence-with-nested-attributes/
---

More often than not, developers typically want to ensure the presence of the parent model when accepting nested attributes for the dependent model. This can normally be validated with the simple class below:

```ruby
class Tree < ActiveRecord::Base
  belongs_to :forest
  attr_accessible :common_name, :forest_id, :scientific_name

  validates_presence_of :forest
  validates_presence_of :common_name
  validates_presence_of :scientific_name
end
```

However, the order that `accepts_nested_attributes_for` validates and saves the Forest and Tree models will cause the `validates_presence_of :forest` to fail. This occurs because the Forest is saved after the Tree, so there isn't the presence of the `forest_id` attribute yet, since the Forest hasn't yet been created. However, this same presence validation can be expressed in a slightly different way, with `inverse_of` which will play nicely with nested attributes.

Below the `inverse_of` is implemented with a `has_many`/`belongs_to` relationship where the Forest model `accepts_nested_attributes_for` the Tree model:

```ruby
class Tree < ActiveRecord::Base
  belongs_to :forest, inverse_of: :trees
  attr_accessible :common_name, :forest_id, :scientific_name

  validates_presence_of :common_name
  validates_presence_of :scientific_name
end
```

And the Forest model that accepts the nested attributes for Tree:

```ruby
class Forest < ActiveRecord::Base
  has_many :trees
  accepts_nested_attributes_for :trees, inverse_of: :forest, allow_destroy: true
  attr_accessible :trees_attributes

  attr_accessible :climate, :latitude, :longitude, :name, :size

  validates_presence_of :name
  validates_presence_of :size
  validates_presence_of :climate
  validates_presence_of :latitude
  validates_presence_of :longitude
end
```

Now you have the same `validates_presence_of` validation which plays nicely with `accepts_nested_attributes_for`. The reason the `inverse_of` works is because it tells Rails to automatically create the associated join models when the records are saved. Also, the `inverse_of` specification helps Rails to optimize in-memory associations, which will result in better performance for your app. Without it, Rails will actually load a second copy of the Tree, if it's already in memory, when you perform an operation like `@forest.trees.first`.

Another important thing to note is that `inverse_of` doesn't work with `:through` and `:polymorphic` associations.

<http://api.rubyonrails.org/classes/ActiveRecord/Associations/ClassMethods.html>
<https://github.com/rails/rails/issues/1383>
