import { GLOB_TESTS } from "@rainbowatcher/eslint-config-shared"
import type { EslintFlatConfigItem } from "@rainbowatcher/eslint-config-shared"

export function test(): EslintFlatConfigItem {
    return {
        files: [GLOB_TESTS],
        name: "rainbowatcher:js:test-style",
        rules: {
            "style-js/eol-last": "off",
            "test/consistent-test-it": ["error", { fn: "it", withinDescribe: "it" }],
            "test/no-identical-title": "error",
            "test/no-import-node-test": "error",
            "test/prefer-hooks-in-order": "error",
            "test/prefer-lowercase-title": "error",
        },
    }
}
