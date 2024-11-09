import {
    GLOB_JS, GLOB_JSX, GLOB_MARKDOWN_CODE, GLOB_TS, GLOB_TSX, interopDefault,
} from "@rainbowatcher/eslint-config-shared"
import { getFiles } from "../files"
import type { EslintFlatConfigItem, Options } from "@rainbowatcher/eslint-config-shared"

export async function unicorn(opts: Options): Promise<EslintFlatConfigItem> {
    const pluginUnicorn = await interopDefault(import("eslint-plugin-unicorn"))
    return {
        files: getFiles(opts),
        ignores: [GLOB_MARKDOWN_CODE],
        name: "rainbowatcher:js:unicorn",
        rules: {
            ...pluginUnicorn.configs.recommended.rules,
            "unicorn/better-regex": "off",
            "unicorn/consistent-existence-index-check": "error",
            "unicorn/consistent-function-scoping": "off",
            "unicorn/filename-case": "off",
            "unicorn/no-array-push-push": "error",
            "unicorn/no-array-reduce": "error",
            "unicorn/no-empty-file": "error",
            "unicorn/no-null": "off",
            "unicorn/prefer-export-from": "off",
            "unicorn/prefer-global-this": "error",
            "unicorn/prefer-math-min-max": "error",
            // It doesn't work well. If there are more configuration items, We will try to open it.
            "unicorn/prefer-ternary": "off",
            "unicorn/prevent-abbreviations": "off",
        },
    }
}

export function jsxFileName(opts: Options): EslintFlatConfigItem {
    if (!opts.jsx) return {}
    return {
        files: opts.typescript ? [GLOB_JSX, GLOB_TSX] : [GLOB_JSX],
        ignores: [GLOB_MARKDOWN_CODE],
        name: "rainbowatcher:js:jsx-file-name",
        rules: {
            "unicorn/filename-case": ["error", {
                cases: {
                    pascalCase: true,
                },
            }],
        },
    }
}
