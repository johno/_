---
layout: post
title: Nested Attributes with Rails 3
summary: An example of the awesomeness of accepts_nested_attributes_for with Rails 3 models and forms.
category: Rails
date: 2013-01-10
path: /rails/2013/01/10/nested-attributes-with-rails/
---

## Introduction

[For those that just want to see the code.](https://github.com/johnotander/nested_attr)

Developing web applications in Rails will inevitably lead to an Active Record `has_many`/`has_one` and `belongs_to` relationship. These Active Record associations can produce overly verbose and redundant code that become very difficult to maintain. Luckily, Ruby on Rails provides the `accepts_nested_attributes_for` method that results in the syntactic goodness that we strive for.

If this relationship isn't accomplished with `accepts_nested_attributes_for`, we result in two undesirable situations:

### A sloppy controller

Consider the abstracted new/create actions below:

###### Note: The parameters in the create action may vary, depending on your form.

```ruby
class ParentModelController < ApplicationController

  def new
    @parent_model = ParentModel.new
    @child_model = ChildModel.new
  end

  def create
    @parent_model = ParentModel.new params[:parent_model]
    @child_model = ChildModel.new params[:child_model]
    @child_model.parent_model = @parent_model

    if @parent_model.valid? and @child_model.valid?
      @parent_model.save!
      @child_model.save!

      redirect_to parent_models_path
    else
      render :new
    end
  end
end
```

As you can see, the controller becomes rather sloppy. Also, as the models change, since they always do, the upkeep becomes unbearable. For example, what happens if we decide to add a ChildToTheChildModel? If this is expected to be created in the same form as the others, we will have an ugly conditional similar to:

```ruby
if @parent_model.valid? and @child_model.valid? and @child_to_the_child_model.valid?
  #...
end
```

We don't want that.

### Redundant error views

Consider error messages, which are typically handled by a block similar to what's below.

```html+erb
<% if @parent_model.errors.any? %>
<div id="error_explanation">
  <h2>
    <%= pluralize(@forest.errors.count, "error") %> prohibited this ParentModel
    from being saved:
  </h2>

  <ul>
    <% @parent_model.errors.full_messages.each do |msg| %>
    <li><%= msg %></li>
    <% end %>
  </ul>
</div>
<% end %>
```

We won't be displaying any error messages if all of them occurred on the child_model. So, we will have to violate the DRY principle by adding redundant error handling. Additionally, like the consideration made before, what happens as more dependent models are needed? This view redundancy really begins to exhibit side-effects.

## Taking Advantage of accepts_nested_attributes_for

By utilizing the `accepts_nested_attributes_for` method, we can quickly, and efficiently clear up any model dependency code smells. Essentially, all this method does is accept a nested hash of attributes from the form, and assigns them to all the child models that are associated with the parent model. This is achieved by defining a writer on the dependent models.

Parent => Child => Child to the Child => ... where `child_attributes=(attributes)` and `child_to_the_child_attributes=(attributes)`.

<http://api.rubyonrails.org/classes/ActiveRecord/NestedAttributes/ClassMethods.html>

## A Forest that has_many Trees

For this example we will use Forest and Tree models where a Tree `belongs_to` a Forest like so:

```ruby
class Forest < ActiveRecord::Base
  has_many :trees, dependent: :destroy
end

class Tree < ActiveRecord::Base
  belongs_to :forest
end
```

### So lets start a little project to test this out \([or clone it on github](https://github.com/johnotander/nested_attr.git)\):

First, create the project.

    $ rails new nested_attributes; cd nested_attributes

Then, create a Forest scaffold with some attributes

###### note: I'm not normally a fan of utilizing scaffolds, but I will use them here for brevity's sake.

    $ rails g scaffold Forest name:string size:integer latitude:integer longitude:integer climate:string

Thirdly, create the Tree scaffold.

    $ rails g scaffold Tree common_name:string scientific_name:string forest_id:integer

Now, after a migrate, we're ready to get to the code.

     $ bundle exec rake db:migrate

### Add Nested Attributes to the Forest/Tree Models

Since the Forest, as the primary(`has_many`) model, will be accepting the nested attributes for the dependent Trees, this is the majority of the model logic will live. As you will see below, it is simply three lines of syntactic sugar:

#### app/models/forest.rb

```ruby
class Forest < ActiveRecord::Base
  has_many :trees
  accepts_nested_attributes_for :trees, allow_destroy: true
  attr_accessible :trees_attributes

  attr_accessible :climate, :latitude, :longitude, :name, :size

  validates_presence_of :name
  validates_presence_of :size
  validates_presence_of :climate
  validates_presence_of :latitude
  validates_presence_of :longitude
end
```

The `allow_destroy` parameter ensures that the Forest's Trees will be destroyed along with the Forest itself. If this is desired, the `allow_destroy: true` must be provided, since this functionality is off by default.

The Tree model will remain pretty much the same.

#### app/models/tree.rb

```ruby
class Tree < ActiveRecord::Base
  belongs_to :forest
  attr_accessible :common_name, :forest_id, :scientific_name

  validates_presence_of :common_name
  validates_presence_of :scientific_name
end
```

### Build the Tree in the Forest Controller

The beauty of `accepts_nested_attributes_for` will begin to come out as we dive into the controller. First off, in order to perform standard CRUD on a Forest and it's Trees, all you need is a `ForestController < ApplicationController` since the Trees themselves will be manipulated through the same form. So, all we need to do is instantiate the Forest and a Tree like the `new` action below:

#### app/controllers/forests_controller.rb

```ruby
# GET /forests/new
# GET /forests/new.json
def new
  @forest = Forest.new
  @forest.trees.build

  respond_to do |format|
    format.html # new.html.erb
    format.json { render json: @forest }
  end
end
```

This will create the instance variable for `@forest` and a dependent Tree, similar to what `@forest.trees << Tree.new` would achieve. Additionally, if you wanted to add three Trees to every Forest, you could replace `@forest.trees.build` with `3.times { |t| @forest.trees.build }`. It's as simple as that.

### Wire in the Views for Nested Attributes

The first thing I like to do with my forms is to rip out the fields in the form into a `_fields.html.erb` partial. This ends up coming in very handy later on. So, after doing that in the forests directory we end up with:

#### app/views/forests/\_form.html.erb

```html+erb
<%= form_for(@forest) do |f| %> <% if @forest.errors.any? %>
<div id="error_explanation">
  <h2>
    <%= pluralize(@forest.errors.count, "error") %> prohibited this forest from
    being saved:
  </h2>

  <ul>
    <% @forest.errors.full_messages.each do |msg| %>
    <li><%= msg %></li>
    <% end %>
  </ul>
</div>
<% end %> <%= render partial: 'fields', locals: { f: f } %>

<div class="actions">
  <%= f.submit %>
</div>
<% end %>
```

#### app/views/forests/\_fields.html.erb

```html+erb
<div class="field">
  <%= f.label :name %><br />
  <%= f.text_field :name %>
</div>
<div class="field">
  <%= f.label :size %><br />
  <%= f.text_field :size %>
</div>
<div class="field">
  <%= f.label :latitude %><br />
  <%= f.text_field :latitude %>
</div>
<div class="field">
  <%= f.label :longitude %><br />
  <%= f.text_field :longitude %>
</div>
<div class="field">
  <%= f.label :climate %><br />
  <%= f.text_field :climate %>
</div>
```

We will also add a `_fields.html.erb` file for Trees.

#### app/views/trees/\_fields.html.erb

```html+erb
<h3>Tree</h3>
<div class="field">
  <%= f.label :common_name %><br />
  <%= f.text_field :common_name %>
</div>
<div class="field">
  <%= f.label :scientific_name %><br />
  <%= f.text_field :scientific_name %>
</div>
```

Now, we just need to render the fields partial for each Tree that belongs to the instantiated Forest. In order to do this, we just need to include the following at the bottom of the `app/view/forests/_fields.html.erb` partial:

```html+erb
<%= f.fields_for :trees do |t| %> <%= render partial: 'trees/fields', locals: {
f: t } %> <% end %>
```

This snippet ensures that the `trees/fields` partial will be rendered for each Tree that belongs to `@forest`. As you can see, we are also passing a local variable with the argument `locals: { f: t }`, which is sending the form builder to the fields partial. Since the `|t|` is part of the `f.fields_for :trees do |t|` block, Rails automagically increments the attributes for each Tree. That way, the parameters that are passed for each Tree are separate, ensuring that a later Tree's attributes in the parameters hash won't overwrite a predecessor.

## That's It

Just like that we have implemented a `has_many`/`belongs_to` relationship which requires only one controller and only one form view partial for the dependent model, Tree in this case. Pretty clean, pretty simple, absolutely automagical.

Don't forget to check the [source](https://github.com/johnotander/nested_attr) if something's unclear, or email me: <johnotander@icloud.com>.
