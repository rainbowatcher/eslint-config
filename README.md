[![npm](https://img.shields.io/npm/v/@rainbowatcher/eslint-config?color=a1b858)](https://npmjs.com/package/@rainbowatcher/eslint-config)
![npm download](https://img.shields.io/github/license/rainbowatcher/eslint-config?color=a1b858&)
![GitHub repo size](https://img.shields.io/github/repo-size/rainbowatcher/eslint-config)

# @rainbowatcher/eslint-config

## Features

- Double quotes, no semi colon

## Why

1. double quotes

We use double quotes, because Strings in many other backend languages that are using double quotes, It can reduce the discomfort when switching languages and make coding smoother.

## Usage

### Install

```bash
pnpm add -D eslint @rainbowatcher/eslint-config
```

### Config `.eslintrc`

```json
{
    "extends": "@rainbowatcher"
}
```

<!-- > You don't need `.eslintignore` normally as it has been provided by the preset. -->

### Add script for package.json

For example:

```json
{
    "scripts": {
        "lint": "eslint .",
        "lint:fix": "eslint . --fix"
    }
}
```

### Config VS Code auto fix

Install [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and create `.vscode/settings.json`

```json
{
    "prettier.enable": false,
    "editor.formatOnSave": false,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    }
}
```

### TypeScript Aware Rules

Type aware rules are enabled when a `tsconfig.eslint.json` is found in the project root, which will introduce some stricter rules into your project. If you want to enable it while have no `tsconfig.eslint.json` in the project root, you can change tsconfig name by modifying `ESLINT_TSCONFIG` env.

```ts
// eslint.config.js
import process from "node:process"
import type { EslintFlatConfigItem, Options } from "@rainbowatcher/eslint-config-shared"

// const foo = "bar"
process.env.ESLINT_TSCONFIG = "tsconfig.json"
export default {
    extends: "@rainbowatcher",
}
```

```js
// eslint.config.js
import process from "node:process"
import { EslintFlatConfigItem, Options } from "@rainbowatcher/eslint-config-shared"

process.env.ESLINT_TSCONFIG = "tsconfig.json"
export default {
    extends: "@rainbowatcher",
}
```

## Plan

We will consider referencing the following projects:

1. [eslint-config-standard](https://github.com/standard/eslint-config-standard)
2. [eslint-config-xo](https://github.com/xojs/eslint-config-xo)
3. [eslint-config-alloy](https://github.com/AlloyTeam/eslint-config-alloy)
4. [antfu/eslint-config](https://github.com/antfu/eslint-config)

## Development

1. Clone this repository
2. Enable Corepack by using `corepack enable` (use `npm i -g corepack` for Node.js < 16.10)
3. Install dependencies by using `pnpm install`
4. Add rules and test cases, then run tests by using `pnpm test`

## License

[MIT](./LICENSE) License &copy; 2023-PRESENT [Rainbow Watcher](https://github.com/rainbowatcher)
