[![npm](https://img.shields.io/npm/v/@rainbowatcher/eslint-config?color=16a34a&label=latest)](https://npmjs.com/package/@rainbowatcher/eslint-config)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/rainbowatcher/eslint-config/ci.yml?color=16a34a)
![npm download](https://img.shields.io/github/license/rainbowatcher/eslint-config?color=16a34a)
![GitHub repo size](https://img.shields.io/github/repo-size/rainbowatcher/eslint-config?color=16a34a)

# @rainbowatcher/eslint-config

## Features

- Opinionated
- Auto fix for formatting, Double quotes, no semi colon
- Designed to work with TypeScript, JSX, Vue, JSON, YAML, Toml, Markdown, etc. Out-of-box.

We use double quotes, because Strings in many other backend languages that are using double quotes, It can reduce the discomfort when switching languages and make coding smoother.

## Usage

### 1. Run init setup script

```bash
npx @rainbowatcher/eslint-config
```

finally it will generate a file like follow

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
    // ...
})
```

### 2. Add script in package.json

For example:

```json
{
    "scripts": {
        "lint": "eslint ."
    }
}
```

### 3. Config Editor for auto fix

#### VS Code

Install [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and create `.vscode/settings.json` based on your project root

```jsonc
{
    // recommend turn prettier disable when style option is enable
    "prettier.enable": false,
    "editor.formatOnSave": false,
    "editor.codeActionsOnSave": {
        "source.organizeImports": "never",
        "source.fixAll.eslint": true
    },
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "json",
        "json5",
        "jsonc",
        "markdown",
        "toml",
        "typescript",
        "typescriptreact",
        "vue",
        "yaml",
    ],
}
```

#### Zed

create `.zed/settings.json` based on your project root

```jsonc
{
    "formatter": {
        "code_actions": {
            "source.fixAll.eslint": true,
        },
    },
    "languages": {
        "Markdown": {
            "format_on_save": "on"
        }
    },
    "language_servers": ["eslint", "vtsls"],
    "language_server_options": {
        "eslint": {
            "language_ids": [
                "javascript",
                "javascriptreact",
                "json",
                "json5",
                "jsonc",
                "markdown",
                "toml",
                "typescript",
                "typescriptreact",
                "vue",
                "yaml",
            ],
        }
    }
}
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
    style?: boolean | StyleOptions

    /**
     * enable lint for toml
     */
    toml?: boolean

    /**
     * enable lint for typescript
     */
    typescript?: boolean | TypescriptOptions

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
}

export type TypescriptOptions = {
    tsconfigPath: string
    typeAware?: boolean
}

export type StyleOptions = {
    semi?: boolean
    singleQuote?: boolean
    tabWidth?: number
    trailingComma?: "all" | "none"
    useTabs?: boolean
}
```

## Plan

We will consider referencing the following projects:

1. [antfu/eslint-config](https://github.com/antfu/eslint-config)
2. [eslint-config-standard](https://github.com/standard/eslint-config-standard)
3. [eslint-config-xo](https://github.com/xojs/eslint-config-xo)
4. [eslint-config-alloy](https://github.com/AlloyTeam/eslint-config-alloy)

## Development

1. Clone this repository
2. Install dependencies by using `pnpm install`
3. Add rules and test cases, then run tests by using `pnpm test`

## License

[MIT](./LICENSE) License &copy; 2023-PRESENT [Rainbow Watcher](https://github.com/rainbowatcher)
