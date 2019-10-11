# MDX interleaving

Currently, MDX interleaving is achievable via `@mdx-js/runtime`, however that isn't a viable long term solution since MDX interleaving can be handled during buildtime with a proper API.

I lean towards leveraging a special JSX tag that signals that it's children will be another MDX string.
This is based off the MDXC approach, and feel like it is the best example because it removes the majority of the guessing in terms of "what is and what isn't MD?".

#### All text is MDX

This has the best ergonomics, but will be very complex to parse.

```
<Alert variant="warning">
  ## I'm an h2

  I'm a paragraph
</Alert>
```

#### `<MDX />`

This is explicit and would be trivial to parse, however the ergonomics
aren't as approachable as "everything is markdown".

```
<Alert variant="warning">
  <MDX>
    ## I'm an h2

    I'm a paragraph
  </MDX>
</Alert>
```
