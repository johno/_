# Prettier pre-commit hook

For projects I'm always googling this so I figured I'd write
up the steps.

```sh
yarn add prettier husky lint-staged
```

Then update your `package.json` to look like:

```json
{
  "private": true,
  "name": "digital-garden",
  "version": "0.0.0",
  "scripts": {
    "publish": "lerna publish"
  },
  "workspaces": [
    "packages/*",
    "site"
  ],
  "dependencies": {
    "husky": "^1.3.1",
    "lerna": "^3.13.1",
    "lint-staged": "^8.1.5",
    "prettier": "^1.16.4"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{js,md,mdx}": ["prettier --write --no-semi --single-quote", "git add"]
  }
}
```

- https://prettier.io/docs/en/precommit.html
