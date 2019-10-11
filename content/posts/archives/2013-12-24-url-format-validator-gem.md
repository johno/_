---
layout: post
title: Url Format Validator, Yet Another Gem
summary: Validate urls and format them with an all-inclusive gem.
tags:
  - ruby
  - ruby-on-rails
date: 2013-12-24
slug: /gems/2013/12/24/url-format-validator-gem/
---

While working on the news aggregator for [localmotion](http://localmotion.io), I needed a way to validate domains. However, I preferred a different solution to those out there. I typically like to leverage the `ActiveModel::EachValidator` to ensure that my validations are simple and easy to read in my model:

```ruby
validates :url, url_format: true
```

So, I built my own which can be found on [Github](https://github.com/johnotander/url_format) and [RubyGems](http://rubygems.org/gems/url_format).

I took advantage of the `URI` library and a thorough Regex designed by [Dean Perry and Ryan Bates](https://github.com/deanperry/url_formatter/blob/master/lib/url_formatter.rb), which was where all the heavy lifting occurred.

Then, I also added a domain method so I could get the domain/host from the url for display purposes:

```ruby
UrlFormat.get_domain(url)
```

I was able to leverage the `URI#parse` method to keep the method clean and simple:

```ruby
def self.get_domain(url)
  host = URI.parse(url).host.downcase
  host.start_with?('www.') ? host[4..-1] : host
rescue URI::InvalidURIError
end
```
