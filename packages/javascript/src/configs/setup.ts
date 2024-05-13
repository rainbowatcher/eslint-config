import { interopDefault } from "@rainbowatcher/eslint-config-shared"
import type { EslintFlatConfigItem } from "@rainbowatcher/eslint-config-shared"

export async function setup(): Promise<EslintFlatConfigItem> {
    const [
        pluginImport,
        pluginAntfu,
        pluginUnusedImports,
        pluginPerfectionist,
        pluginUnicorn,
        pluginNode,
    ] = await Promise.all([
        interopDefault(import("eslint-plugin-import-x")),
        interopDefault(import("eslint-plugin-antfu")),

        // @ts-expect-error missing types
        interopDefault(import("eslint-plugin-unused-imports")),

        // @ts-expect-error missing types
        interopDefault(import("eslint-plugin-perfectionist")),

        // @ts-expect-error missing types
        interopDefault(import("eslint-plugin-unicorn")),
        interopDefault(import("eslint-plugin-n")),
    ])

    return {
        name: "rainbowatcher:js:setup",
        plugins: {
            antfu: pluginAntfu,
            import: pluginImport,
            node: pluginNode,
            perfectionist: pluginPerfectionist,
            unicorn: pluginUnicorn,
            "unused-imports": pluginUnusedImports,
        },
    }
}
