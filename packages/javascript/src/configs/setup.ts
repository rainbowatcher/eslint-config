import { interopDefault } from "@rainbowatcher/eslint-config-shared"
import type { EslintFlatConfigItem, Options } from "@rainbowatcher/eslint-config-shared"

export async function setup(opts: Options): Promise<EslintFlatConfigItem> {
    let config: EslintFlatConfigItem = {}

    const [
        pluginAntfu,
        pluginImport,
        pluginNode,
        pluginPerfectionist,
        pluginRegexp,
        pluginUnicorn,
        pluginUnusedImports,
        pluginVitest,
    ] = await Promise.all([
        interopDefault(import("eslint-plugin-antfu")),
        interopDefault(import("eslint-plugin-import-x")),
        interopDefault(import("eslint-plugin-n")),
        interopDefault(import("eslint-plugin-perfectionist")),
        interopDefault(import("eslint-plugin-regexp")),
        interopDefault(import("eslint-plugin-unicorn")),
        interopDefault(import("eslint-plugin-unused-imports")),
        interopDefault(import("@vitest/eslint-plugin")),
    ])

    config = {
        name: "rainbowatcher:js:setup",
        plugins: {
            antfu: pluginAntfu,
            import: pluginImport,
            node: pluginNode,
            perfectionist: pluginPerfectionist,
            regexp: pluginRegexp,
            test: pluginVitest,
            unicorn: pluginUnicorn,
            "unused-imports": pluginUnusedImports,
        },
    }

    if (opts.style) {
        const [
            pluginStylisticJs, pluginStylisticJsPlus, pluginStylisticJsx,
        ] = await Promise.all([
            interopDefault(import("@stylistic/eslint-plugin-js")),
            interopDefault(import("@stylistic/eslint-plugin-plus")),
            interopDefault(import("@stylistic/eslint-plugin-jsx")),
        ])

        config.plugins = {
            ...config.plugins,
            "style-ex": pluginStylisticJsPlus,
            "style-js": pluginStylisticJs,
            "style-jsx": pluginStylisticJsx,
        }
    }

    return config
}
