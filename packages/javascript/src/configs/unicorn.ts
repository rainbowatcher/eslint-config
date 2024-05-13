import { GLOB_MARKDOWN_CODE, GLOB_SRC, interopDefault } from "@rainbowatcher/eslint-config-shared"
import type { EslintFlatConfigItem } from "@rainbowatcher/eslint-config-shared"

export async function unicorn(): Promise<EslintFlatConfigItem[]> {
    // @ts-expect-error missing types
    const pluginUnicorn = await interopDefault(import("eslint-plugin-unicorn"))
    return [{
        ignores: [GLOB_MARKDOWN_CODE],
        name: "rainbowatcher:js:unicorn",
        rules: {
            ...pluginUnicorn.configs.recommended.rules,
            "unicorn/filename-case": "off",
            "unicorn/no-array-reduce": ["error", { allowSimpleOperations: true }],
            "unicorn/no-empty-file": "error",
            "unicorn/no-null": "off",
            "unicorn/prefer-export-from": "off",
            "unicorn/prevent-abbreviations": "off",
        },
    }, {
        files: [GLOB_SRC],
        ignores: [GLOB_MARKDOWN_CODE],
        name: "rainbowatcher:js:limitFileName",
        rules: {
            "unicorn/filename-case": ["error", {
                cases: {
                    pascalCase: true,
                    snakeCase: true,
                },
            }],
        },
    }]
}
