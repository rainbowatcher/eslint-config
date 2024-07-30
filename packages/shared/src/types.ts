import type { Linter } from "eslint"
import type { Awaitable } from "eslint-flat-config-utils"

export type EslintFlatConfigItem = {
    plugins?: Record<string, any>
} & Omit<Linter.Config, "plugins">

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

    // astro/react/svelte/...
}

// get all alterable field of a object
export type Alterable<T> = {
    [K in keyof T as T[K] extends boolean | undefined ? never : K]: T[K]
}

export type AltOptionValue<T> = T extends boolean ? never : T

export type TypescriptOptions = {
    typeAware?: boolean
}

export type StyleOptions = {
    indent?: number
    quote?: "double" | "single"
    semi?: boolean
    trailingComma?: boolean
    useTabs?: boolean
}
