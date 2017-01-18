---
layout: post
title: A Project Scaffold for Test-Driven Development in JavaScript
tags:
    - tdd
    - javascript
    - node
    - tools
---

Here's a `pacakage.json` file to quickstart a JavaScript TDD project using Babel, Jest and ESLint.

* [Babel](https://babeljs.io/) to transpile ESNext code
* [Jest](https://facebook.github.io/jest/) test framework with the babel-jest preprocessor
* [ESLint](http://eslint.org/) with the [AirBnB base linting rules](https://www.npmjs.com/package/eslint-config-airbnb-base) (overridden by a few of my own preferences)

I've also included the relevant config within the same `package.json` instead of separate `.eslintrc` and `.babelrc` files.

There's a [github gist](https://gist.github.com/albertkawmi/b80b610e0f259c9512cc81f719a3219c) or you can just grab it here:

```json
{
  "name": "javascript-tdd-scaffold",
  "version": "1.0.0",
  "description": "installs babel, jest and eslint with airbnb rules",
  "main": "index.js",
  "scripts": {
    "start": "babel-node index.js",
    "test": "jest",
    "tdd": "jest --watch"
  },
  "keywords": [
    "tdd",
    "babel",
    "jest",
    "eslint"
  ],
  "author": "Albert Kawmi",
  "license": "WTFPL",
  "devDependencies": {
    "babel-cli": "^6.18.0",
    "babel-core": "6.x",
    "babel-eslint": "6.x",
    "babel-jest": "12.x",
    "babel-preset-es2015": "6.x",
    "babel-preset-stage-0": "6.x",
    "eslint": "3.x",
    "eslint-config-airbnb-base": "11.x",
    "eslint-plugin-import": "*",
    "jest-cli": "17.x"
  },
  "babel": {
    "presets": [
      "es2015",
      "stage-0"
    ]
  },
  "jest": {
    "transform": { ".*": "node_modules/babel-jest" },
    "verbose": false,
    "testRegex": "tests/.*\\.test.js$",
    "automock": false,
    "bail": true,
    "testEnvironment": "node"
  },
  "eslintConfig": {
    "parser": "babel-eslint",
    "env": {
      "browser": true,
      "node": true
    },
    "extends": "airbnb-base",
    "ecmaFeatures": {
      "modules": true
    },
    "rules": {
      "indent": [
        0,
        2
      ],
      "no-multi-spaces": 0,
      "no-nested-ternary": 0,
      "new-cap": 0,
      "no-undef": 1,
      "vars-on-top": 0,
      "no-unused-vars": 1,
      "no-use-before-define": 0,
      "comma-dangle": 0,
      "image-uses-alt": 0,
      "redundant-alt": 0,
      "valid-aria-role": 0,
      "import/prefer-default-export": 0
    }
  }
}
```
__Please note:__ don't use the `npm start` command in production as `babel-node` is [not intended for this](https://babeljs.io/docs/usage/cli/#babel-node).

Season to taste and enjoy. 👌