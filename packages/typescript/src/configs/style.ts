import type { Linter } from "eslint"
import { jsStyleConfig } from "@rainbowatcher/eslint-config-js"
import { GLOB_TS, renameRules } from "@rainbowatcher/eslint-config-shared"
import stylisticTs from "@stylistic/eslint-plugin-ts"

const tsStyleConfig: Linter.FlatConfig = {
    name: "rainbowatcher/ts/style",
    files: [GLOB_TS],
    plugins: {
        style: stylisticTs,
    },
    rules: {
        "style/brace-style": ["error", "1tbs", { allowSingleLine: true }],
        "style/comma-dangle": ["error", "always-multiline"],
        "style/comma-spacing": ["error", { before: false, after: true }],
        "style/func-call-spacing": ["error", "never"],
        "style/block-spacing": ["error", "always"],
        "style/key-spacing": ["error", { beforeColon: false, afterColon: true }],
        "style/object-curly-spacing": ["error", "always"],
        "style/indent": ["error", 4, { SwitchCase: 1, VariableDeclarator: 1, outerIIFEBody: 1 }],
        "style/keyword-spacing": "error",
        "style/lines-between-class-members": [
            "error",
            "always",
            {
                exceptAfterSingleLine: true,
            },
        ],
        "style/member-delimiter-style": ["error", { multiline: { delimiter: "none" } }],
        "style/no-extra-parens": ["error", "functions"],
        "style/no-extra-semi": "error",
        "style/semi": ["error", "never"],
        "style/space-infix-ops": "error",
        "style/type-annotation-spacing": "error",
        "style/quotes": ["error", "double", { avoidEscape: true }],
        "style/quote-props": ["error", "as-needed"],
    },
}

function tsStyleExtendJsConfig(): Linter.FlatConfig {
    return {
        ...jsStyleConfig,
        files: [GLOB_TS],
        plugins: {
            "style-js": jsStyleConfig.plugins!.style,
        },
        rules: {
            ...renameRules(jsStyleConfig.rules, { style: "style-js" }),
            "style/brace-style": 0,
            "style/comma-dangle": 0,
            "style/comma-spacing": 0,
            "style/block-spacing": 0,
            "style/key-spacing": 0,
            "style/object-curly-spacing": 0,
            "style/indent": 0,
            "style/keyword-spacing": 0,
            "style/lines-between-class-members": 0,
            "style/semi": 0,
            "style/space-infix-ops": 0,
            "style/quote-props": 0,
        },
    }
}

export {
    tsStyleConfig,
    tsStyleExtendJsConfig,
}
