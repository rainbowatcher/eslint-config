import { GLOB_MARKDOWN } from "@rainbowatcher/eslint-config-shared"
import type { EslintFlatConfigItem } from "@rainbowatcher/eslint-config-shared"

export function baseConfig(): EslintFlatConfigItem {
    return {
        files: [`${GLOB_MARKDOWN}/**`],
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    impliedStrict: true,
                },

                // this option make typescript project alert go away
                project: null,
            },
        },
        name: "rainbowatcher:markdown:rules",
        rules: {
            // disable typeAware rules
            ...typeAwareRules,
            ...disableStyleRules,

            "eol-last": "off",
            "no-alert": "off",
            "no-console": "off",
            "no-labels": "off",
            "no-lone-blocks": "off",
            "no-restricted-syntax": "off",
            "no-undef": "off",
            "no-unused-expressions": "off",
            "no-unused-labels": "off",
            "no-unused-vars": "off",
            "padded-blocks": "off",
            strict: "off",

            "ts/consistent-type-imports": "off",
            "ts/no-namespace": "off",
            "ts/no-redeclare": "off",
            "ts/no-require-imports": "off",
            "ts/no-unused-vars": "off",
            "ts/no-use-before-define": "off",
            "ts/no-var-requires": "off",

            "unicode-bom": "off",

            "unused-imports/no-unused-imports": "off",
            "unused-imports/no-unused-vars": "off",

            "markdown/fenced-code-language": "error",
            "markdown/heading-increment": "error",
            "markdown/no-duplicate-headings": "off",
            "markdown/no-empty-links": "error",
            "markdown/no-html": "off",
            "markdown/no-invalid-label-refs": "error",
            "markdown/no-missing-label-refs": "error",
        },
    }
}

const typeAwareRules: EslintFlatConfigItem["rules"] = {
    "ts/await-thenable": "off",
    "ts/dot-notation": "off",
    "ts/no-floating-promises": "off",
    "ts/no-for-in-array": "off",
    "ts/no-implied-eval": "off",
    "ts/no-misused-promises": "off",
    "ts/no-throw-literal": "off",
    "ts/no-unnecessary-type-assertion": "off",
    "ts/no-unsafe-argument": "off",
    "ts/no-unsafe-assignment": "off",
    "ts/no-unsafe-call": "off",
    "ts/no-unsafe-member-access": "off",
    "ts/no-unsafe-return": "off",
    "ts/restrict-plus-operands": "off",
    "ts/restrict-template-expressions": "off",
    "ts/unbound-method": "off",
}

const disableStyleRules: EslintFlatConfigItem["rules"] = {
    "style-js/lines-around-comment": "off",
    "style-ts/lines-around-comment": "off",
}
