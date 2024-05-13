import { GLOB_CSS, GLOB_LESS, GLOB_SCSS } from "@rainbowatcher/eslint-config-shared"
import { prettierOptions } from "../options"
import type { EslintFlatConfigItem, Options } from "@rainbowatcher/eslint-config-shared"

export function css(opts: Options): EslintFlatConfigItem[] {
    if (!opts.style || !opts.css) return []
    return [{
        files: [GLOB_CSS],
        name: "rainbowatcher:prettier:css",
        rules: {
            "prettier/prettier": ["error", {
                ...prettierOptions,
                parser: "css",
            }, {
                usePrettierrc: false,
            }],
        },
    }, {
        files: [GLOB_SCSS],
        name: "rainbowatcher:prettier:scss",
        rules: {
            "prettier/prettier": ["error", {
                ...prettierOptions,
                parser: "scss",
            }, {
                usePrettierrc: false,
            }],
        },
    }, {
        files: [GLOB_LESS],
        name: "rainbowatcher:prettier:less",
        rules: {
            "prettier/prettier": ["error", {
                ...prettierOptions,
                parser: "less",
            }, {
                usePrettierrc: false,
            }],
        },
    }]
}
