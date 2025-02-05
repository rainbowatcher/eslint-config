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

            "no-alert": "off",
            "no-console": "off",
            "no-labels": "off",
            "no-lone-blocks": "off",
            "no-restricted-syntax": "off",
            "no-undef": "off",
            "no-unused-expressions": "off",
            "no-unused-labels": "off",
            "no-unused-vars": "off",
            strict: "off",

            "ts/consistent-type-imports": "off",
            "ts/no-namespace": "off",
            "ts/no-redeclare": "off",
            "ts/no-require-imports": "off",
            "ts/no-unused-vars": "off",
            "ts/no-use-before-define": "off",

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
    "ts/consistent-return": "off",
    "ts/consistent-type-exports": "off",
    "ts/dot-notation": "off",
    "ts/naming-convention": "off",
    "ts/no-array-delete": "off",
    "ts/no-base-to-string": "off",
    "ts/no-confusing-void-expression": "off",
    "ts/no-deprecated": "off",
    "ts/no-duplicate-type-constituents": "off",
    "ts/no-floating-promises": "off",
    "ts/no-for-in-array": "off",
    "ts/no-implied-eval": "off",
    "ts/no-meaningless-void-operator": "off",
    "ts/no-misused-promises": "off",
    "ts/no-misused-spread": "off",
    "ts/no-mixed-enums": "off",
    "ts/no-redundant-type-constituents": "off",
    "ts/no-unnecessary-boolean-literal-compare": "off",
    "ts/no-unnecessary-condition": "off",
    "ts/no-unnecessary-qualifier": "off",
    "ts/no-unnecessary-template-expression": "off",
    "ts/no-unnecessary-type-arguments": "off",
    "ts/no-unnecessary-type-assertion": "off",
    "ts/no-unnecessary-type-parameters": "off",
    "ts/no-unsafe-argument": "off",
    "ts/no-unsafe-assignment": "off",
    "ts/no-unsafe-call": "off",
    "ts/no-unsafe-enum-comparison": "off",
    "ts/no-unsafe-member-access": "off",
    "ts/no-unsafe-return": "off",
    "ts/no-unsafe-type-assertion": "off",
    "ts/no-unsafe-unary-minus": "off",
    "ts/non-nullable-type-assertion-style": "off",
    "ts/only-throw-error": "off",
    "ts/prefer-destructuring": "off",
    "ts/prefer-find": "off",
    "ts/prefer-includes": "off",
    "ts/prefer-nullish-coalescing": "off",
    "ts/prefer-optional-chain": "off",
    "ts/prefer-promise-reject-errors": "off",
    "ts/prefer-readonly": "off",
    "ts/prefer-readonly-parameter-types": "off",
    "ts/prefer-reduce-type-parameter": "off",
    "ts/prefer-regexp-exec": "off",
    "ts/prefer-return-this-type": "off",
    "ts/prefer-string-starts-ends-with": "off",
    "ts/promise-function-async": "off",
    "ts/related-getter-setter-pairs": "off",
    "ts/require-array-sort-compare": "off",
    "ts/require-await": "off",
    "ts/restrict-plus-operands": "off",
    "ts/restrict-template-expressions": "off",
    "ts/return-await": "off",
    "ts/strict-boolean-expressions": "off",
    "ts/switch-exhaustiveness-check": "off",
    "ts/unbound-method": "off",
    "ts/use-unknown-in-catch-callback-variable": "off",
}

const disableStyleRules: EslintFlatConfigItem["rules"] = {
    "style-js/lines-around-comment": "off",
    "style-ts/lines-around-comment": "off",
}
