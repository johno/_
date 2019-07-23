# Symbolic links with git

In git it's important that all references to a file
are **relative to the git repo itself**.

So, if you want to link the `docs/readme.md` to
`packages/gatsby-theme-documentation/readme.md`
(the original source file) you must operate relative
to your destination file:

```
~/c/gatsby-theme-documentation master*
❯ mkdir docs

~/c/gatsby-theme-documentation master*
❯ cd docs

~/c/gatsby-theme-documentation/docs master*
❯ ls

~/c/gatsby-theme-documentation/docs master*
❯ ln -s ../packages/gatsby-theme-documentation/readme.md readme.md

~/c/gatsby-theme-documentation/docs master*
❯ ls
readme.md
```
