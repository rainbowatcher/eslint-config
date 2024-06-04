[![npm](https://img.shields.io/npm/v/@rainbowatcher/eslint-config?color=006769)](https://npmjs.com/package/@rainbowatcher/eslint-config)
![npm download](https://img.shields.io/github/license/rainbowatcher/eslint-config?color=006769)
![GitHub repo size](https://img.shields.io/github/repo-size/rainbowatcher/eslint-config?color=006769)

# @rainbowatcher/eslint-config

## Features

- Opinionated
- Auto fix for formatting, Double quotes, no semi colon
- Designed to work with TypeScript, JSX, Vue, JSON, YAML, Toml, Markdown, etc. Out-of-box.

We use double quotes, because Strings in many other backend languages that are using double quotes, It can reduce the discomfort when switching languages and make coding smoother.

## Usage

### Run init script

```bash
npx @rainbowatcher/eslint-config
```

### Add script in package.json

For example:

```json
{
    "scripts": {
        "lint": "eslint ."
    }
}
```

### Config VS Code auto fix

Install [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and create `.vscode/settings.json`

```json
{
    // recommend turn prettier disable when style option is enable
    "prettier.enable": false,
    "editor.formatOnSave": false,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "eslint.validate": [
        "json",
        "jsonc",
        "json5",
        "javascript",
        "javascriptreact",
        "typescript",
        "typescriptreact",
        "vue",
        "markdown",
        "yaml",
    ],
}
```

### Result

the final result will be like follow

```js
// eslint.config.js
import { defineConfig } from "@rainbowatcher/eslint-config"

export default defineConfig({
    gitignore: true,
    json: true,
    markdown: true,
    style: true,
    typescript: true,
    vue: true,
    yaml: true,
})
```

## Options

```ts
/**
 * there has no default value for each properties, all properties are optional and be set by defineConfig
 */
export type Options = {
    /**
     * enable eslint for css
     */
    css?: boolean

    /**
     * enable git ignore intergration
     */
    gitignore?: boolean

    /**
     * enable lint for graphql
     */
    graphql?: boolean

    /**
     * enable lint for json
     */
    json?: boolean

    /**
     * enable lint for jsx
     */
    jsx?: boolean

    /**
     * enable lint for markdown
     */
    markdown?: boolean

    /**
     * enable stylistic rules
     */
    style?: boolean

    /**
     * enable lint for toml
     */
    toml?: boolean

    /**
     * enable lint for typescript
     */
    typescript?: boolean

    /**
     * enable lint for unocss
     */
    unocss?: boolean

    /**
     * enable eslint for vue
     */
    vue?: boolean

    /**
     * enable lint for yaml
     */
    yaml?: boolean

    // astro/react/svelte/...
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
2. Install dependencies by using `pnpm install`
3. Add rules and test cases, then run tests by using `pnpm test`

## License

[MIT](./LICENSE) License &copy; 2023-PRESENT [Rainbow Watcher](https://github.com/rainbowatcher)
