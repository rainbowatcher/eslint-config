import type { Linter } from "eslint"
import type { Awaitable } from "eslint-flat-config-utils"

export type EslintFlatConfigItem = {
    plugins?: Record<string, any>
} & Omit<Linter.FlatConfig<Linter.RulesRecord>, "plugins">

export type EslintFlatConfigs = Array< Awaitable <EslintFlatConfigItem>>

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
