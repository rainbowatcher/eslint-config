import { GLOB_JS, renameRules } from "@rainbowatcher/eslint-config-shared"
import type { Linter } from "eslint"
import process from "node:process"
import stylisticJs from "@stylistic/eslint-plugin-js"

const jsStyleConfig: Linter.FlatConfig = {
    name: "rainbowatcher/js/style",
    files: [GLOB_JS],
    plugins: {
        style: stylisticJs,
    },
    rules: {
        ...renameRules(stylisticJs.configs["all-flat"].rules, { "@stylistic/js": "style" }),
        "style/array-bracket-newline": ["error", "consistent"],
        "style/array-bracket-spacing": ["error", "never"],
        "style/array-element-newline": ["error", "consistent"],
        "style/arrow-parens": ["error", "as-needed", { requireForBlockBody: true }],
        "style/arrow-spacing": ["error", { before: true, after: true }],
        "style/block-spacing": ["error", "always"],
        "style/brace-style": ["error", "1tbs", { allowSingleLine: true }],
        "style/comma-dangle": ["error", "always-multiline"],
        "style/comma-spacing": ["error", { before: false, after: true }],
        "style/comma-style": ["error", "last"],
        "style/dot-location": ["error", "property"],
        "style/function-call-argument-newline": ["error", "consistent"],
        "style/wrap-regex": "off",
        "style/multiline-ternary": ["error", "always-multiline"],
        "style/padded-blocks": ["error", { classes: "always", switches: "never", blocks: "never" }, { allowSingleLineBlocks: true }],
        "style/indent": ["error", 4, { SwitchCase: 1, VariableDeclarator: 1, outerIIFEBody: 1 }],
        "style/keyword-spacing": "error",
        "style/key-spacing": ["error", { beforeColon: false, afterColon: true }],
        "style/linebreak-style": [process.platform === "win32" ? "off" : "error", "unix"],
        "style/lines-between-class-members": ["error", "always", { exceptAfterSingleLine: true }],
        "style/newline-per-chained-call": ["error", { ignoreChainWithDepth: 3 }],
        "style/no-mixed-spaces-and-tabs": "error",
        "style/no-trailing-spaces": "error",
        "style/no-multi-spaces": "error",
        "style/object-curly-newline": ["error", { consistent: true, multiline: true }],
        "style/object-curly-spacing": ["error", "always"],
        "style/object-property-newline": ["error", { allowMultiplePropertiesPerLine: true }],
        "style/quote-props": ["error", "as-needed"],
        "style/quotes": ["error", "double", { avoidEscape: true }],
        "style/semi": ["error", "never"],
        "style/space-infix-ops": "error",
        "style/space-in-parens": ["error", "never"],
        "style/space-before-function-paren": ["error", { anonymous: "always", named: "never", asyncArrow: "always" }],
        "style/space-before-blocks": ["error", "always"],
        "style/spaced-comment": ["error", "always", {
            line: {
                markers: ["/"],
                exceptions: ["/", "#"],
            },
            block: {
                markers: ["!"],
                exceptions: ["*"],
                balanced: true,
            },
        }],
        "style/template-curly-spacing": "error",
        "style/wrap-iife": [
            "error",
            "inside",
            {
                functionPrototypeMethods: true,
            },
        ],
    },
}

export default jsStyleConfig
