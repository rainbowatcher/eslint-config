import type { Linter } from "eslint"
import type { Arrayable, Awaitable } from "eslint-flat-config-utils"

export type EslintFlatConfigItem = {
    plugins?: Record<string, any>
} & Omit<Linter.FlatConfig<Linter.RulesRecord>, "plugins">

export type EslintFlatConfigs = Array< Awaitable < Arrayable<EslintFlatConfigItem>>>

export type Options = {
    /**
     * enable eslint for css
     * @default false
     */
    css?: boolean

    /**
     * enable git ignore intergration
     * @default true
     */
    gitignore?: boolean

    /**
     * enable lint for graphql
     * @default false
     */
    graphql?: boolean

    /**
     * enable lint for json
     * @default true
     */
    json?: boolean

    /**
     * enable lint for jsx
     * @default false
     */
    jsx?: boolean

    /**
     * enable lint for markdown
     * @default true
     */
    markdown?: boolean

    /**
     * enable stylistic rules
     * @default true
     */
    style?: boolean

    /**
     * enable lint for toml
     * @default false
     */
    toml?: boolean

    /**
     * enable lint for typescript
     * @default true
     */
    typescript?: boolean

    /**
     * enable lint for unocss
     * @default false
     */
    unocss?: boolean

    /**
     * enable eslint for vue
     * @default false
     */
    vue?: boolean

    /**
     * enable lint for yaml
     * @default false
     */
    yaml?: boolean

    // astro/react/svelte/...
}
