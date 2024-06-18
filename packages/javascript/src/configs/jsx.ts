import { GLOB_JSX } from "@rainbowatcher/eslint-config-shared"
import type { EslintFlatConfigItem, Options } from "@rainbowatcher/eslint-config-shared"

export function jsx(opts: Options): EslintFlatConfigItem {
    if (!opts.jsx) return {}

    return {
        files: [GLOB_JSX],
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        name: "rainbowatcher:js:jsx-parser",
    }
}

export default jsx
