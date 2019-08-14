---
layout: post
title: Email Format Validator for Rails
summary: Validate urls and format them with an all-inclusive gem.
category: Gems
date: 2013-12-06
path: /gems/2013/12/06/email-format-validator-for-rails/
---

I made a gem called Email Format that utilizes the `validate_each` method that's included in `ActiveModel::Validations`. It uses the [email_regex](https://github.com/dougwig/email_regex) gem written by Doug Wiegley which "provides a valid email regex that conforms to most valid RFC edges cases (disallows backticks), and allows for a few illegal patterns that are in common use".

The validator itself is very simple, it simply compares the attribute in question to the `EmailRegex::EMAIL_ADDRESS_REGEX` like so:

```ruby
class EmailFormatValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    unless value =~ EmailRegex::EMAIL_ADDRESS_REGEX
      record.errors[attribute] << (options[:message] || "is invalid")
    end
  end
end
```

So, you can now do the following to validate your email attributes:

```ruby
require 'email_format'

class Awesome
  include ActiveModel::Validations

  attr_accessor :email

  validates :email, email_format: true
 end

 awesome = Awesome.new

 awesome.email = "valid@email.com"
 awesome.valid? # => true

 awesome.email = "invalid_email"
 awesome.valid? # => false
```

[See the Github repo](https://github.com/johnotander/email_format)
