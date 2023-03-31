# @rainbowatcher/eslint-config

[![npm](https://img.shields.io/npm/v/@rainbowatcher/eslint-config?color=a1b858&label=)](https://npmjs.com/package/@rainbowatcher/eslint-config)

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

```js
// .eslintrc.js
process.env.ESLINT_TSCONFIG = 'tsconfig.json'

module.exports = {
  extends: '@rainbowatcher'
}
```

## Plan

I will consider referencing the following projects:

1. [eslint-config-standard](https://github.com/standard/eslint-config-standard)
2. [eslint-config-xo](https://github.com/xojs/eslint-config-xo)
3. [eslint-config-alloy](https://github.com/AlloyTeam/eslint-config-alloy)
4. [antfu/eslint-config](https://github.com/antfu/eslint-config)

## Development

1. Clone this repository
2. Enable Corepack using `corepack enable` (use `npm i -g corepack` for Node.js < 16.10)
3. Install dependencies using `pnpm install`
4. Add self to node_modules

```bash
pnpm add -w --workspace \
@rainbowatcher/eslint-config \
@rainbowatcher/eslint-config-js \
@rainbowatcher/eslint-config-ts \
@rainbowatcher/eslint-config-json \
@rainbowatcher/eslint-config-vue
```

## License

[MIT](./LICENSE) License &copy; 2023-PRESENT [Rainbow Watcher](https://github.com/rainbowatcher)
