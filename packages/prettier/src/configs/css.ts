import {
    GLOB_CSS, GLOB_LESS, GLOB_POSTCSS, GLOB_SCSS, parserPlain,
    resolveAltOption,
} from "@rainbowatcher/eslint-config-shared"
import { DefaultPrettierOptions } from "../options"
import type { EslintFlatConfigItem, Options } from "@rainbowatcher/eslint-config-shared"

export function css(opts: Options): EslintFlatConfigItem {
    if (!opts.css) return {}
    const styleOptions = resolveAltOption(opts, "style")
    return {
        files: [GLOB_CSS, GLOB_POSTCSS],
        languageOptions: {
            parser: parserPlain,
        },
        name: "rainbowatcher:prettier:css",
        rules: {
            "prettier/prettier": ["error", {
                ...DefaultPrettierOptions,
                ...styleOptions,
                parser: "css",
            }, {
                usePrettierrc: false,
            }],
        },
    }
}

export function scss(opts: Options): EslintFlatConfigItem {
    if (!opts.style) return {}
    return {
        files: [GLOB_SCSS],
        languageOptions: {
            parser: parserPlain,
        },
        name: "rainbowatcher:prettier:scss",
        rules: {
            "prettier/prettier": ["error", {
                ...DefaultPrettierOptions,
                parser: "scss",
            }, {
                usePrettierrc: false,
            }],
        },
    }
}

export function less(opts: Options): EslintFlatConfigItem {
    if (!opts.style) return {}
    return {
        files: [GLOB_LESS],
        languageOptions: {
            parser: parserPlain,
        },
        name: "rainbowatcher:prettier:less",
        rules: {
            "prettier/prettier": ["error", {
                ...DefaultPrettierOptions,
                parser: "less",
            }, {
                usePrettierrc: false,
            }],
        },
    }
}
