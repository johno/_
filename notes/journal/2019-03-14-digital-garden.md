# Building a digital garden

After getting inspired I figured it was time to begin tending
to my own digital garden. So I decided to build it as an [open-source
Gatsby Theme](https://github.com/johno/digital-garden). It seems
a perfect fit because there will be a lot of internal logic
for handling notes directories, listings, and other code that
could be shared with other folks hoping to do the same.

Then, using [Component Shadowing](https://www.gatsbyjs.org/blog/2019-03-11-gatsby-themes-roadmap/)
others can implement their own designs on top.

Handling the post listing was relatively straightforward and we
made the decision not to paginate so it was a matter of querying
the posts and rendering the list. For the first pass I didn't
even bother separating posts and notes, [processing them on the
fly](https://github.com/johno/digital-garden/blob/a2ce259f93aa06ae21f96f7384e89ae1785277c2/packages/gatsby-theme-digital-garden/gatsby-node.js#L23-L94).

## Organizing content

I think it makes the most sense to opt for a flat structure, so flat
that even pages are brought to the root (defying Gatsby conventions).

```
site
├── gatsby-config.js
├── package.json
├── pages
│   └── index.md
│   └── contact.md
├── posts
│   └── my-first-post.md
└── notes
    ├── music
    │   └── list.md
    └── thoughts
        ├── thoughts-1.md
        └── thoughts-2.md
```

## Brutalist

The initial brutalist vibe was more by accident than anything. I was 
using the defaults of gatsby-theme-system and then tossed in a folder
[feather icon](https://feathericons.com/). It felt right, especially
since it'd be a "base theme" so I left it at that.

![Screenshot of initial design](https://c8r.imgix.net/cc46e52f52b662cdefc33195/Screen%20Shot%202019-03-14%20at%2010.57.03%20AM.png)

## Nested directories

Something that feels like a good UI to me is having the notes folders
mimic the actual filesystem. So you can nest directories and then see
a file listing underneath. Though this would be a bit tricky since we
have to detect if it is a nested directory, and if so skip that in the
folder listing at the outer level.

We will then need to filter the folders and pass that to a wiki index
page. I first handled it in JS, but it's starting to feel like we should
be passing this work off to Gatsby's data layer.

- https://github.com/johno/digital-garden
- https://joelhooks.com/digital-garden
- https://stackingthebricks.com/how-blogs-broke-the-web/
- https://tomcritchlow.com/2019/02/17/building-digital-garden/

## Ordering content

- priority
- sorting based on view count
- random
