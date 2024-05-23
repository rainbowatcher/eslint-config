import {
    GLOB_JS, GLOB_JSX, GLOB_MARKDOWN_CODE, GLOB_SRC,
    GLOB_TS, GLOB_TSX, interopDefault,
} from "@rainbowatcher/eslint-config-shared"
import type { EslintFlatConfigItem, Options } from "@rainbowatcher/eslint-config-shared"

export async function unicorn(opts: Options): Promise<EslintFlatConfigItem[]> {
    // @ts-expect-error missing types
    const pluginUnicorn = await interopDefault(import("eslint-plugin-unicorn"))
    return [{
        files: opts.typescript ? [GLOB_SRC] : [GLOB_JS, GLOB_JSX],
        ignores: [GLOB_MARKDOWN_CODE],
        name: "rainbowatcher:js:unicorn",
        rules: {
            ...pluginUnicorn.configs.recommended.rules,
            "unicorn/consistent-function-scoping": "warn",
            "unicorn/filename-case": "off",
            "unicorn/no-array-reduce": ["error", { allowSimpleOperations: true }],
            "unicorn/no-empty-file": "error",
            "unicorn/no-null": "off",
            "unicorn/prefer-export-from": "off",
            "unicorn/prefer-ternary": ["error", "only-single-line"],
            "unicorn/prevent-abbreviations": "off",
        },
    },
    {
        files: [GLOB_JS, GLOB_TS],
        ignores: [GLOB_MARKDOWN_CODE],
        name: "rainbowatcher:js:limitFileName",
        rules: {
            "unicorn/filename-case": ["error", {
                cases: {
                    camelCase: true,
                    snakeCase: true,
                },
            }],
        },
    },
    {
        files: [GLOB_JSX, GLOB_TSX],
        ignores: [GLOB_MARKDOWN_CODE],
        name: "rainbowatcher:js:limitFileName",
        rules: {
            "unicorn/filename-case": ["error", {
                cases: {
                    pascalCase: true,
                },
            }],
        },
    }]
}
