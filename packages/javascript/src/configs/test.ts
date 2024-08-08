import { GLOB_TESTS, isInEditor } from "@rainbowatcher/eslint-config-shared"
import type { EslintFlatConfigItem } from "@rainbowatcher/eslint-config-shared"

export function test(): EslintFlatConfigItem {
    return {
        files: [GLOB_TESTS],
        name: "rainbowatcher:js:test",
        rules: {
            "node/prefer-global/process": "off",

            "test/consistent-test-it": ["error", { fn: "it", withinDescribe: "it" }],
            "test/no-identical-title": "error",
            "test/no-import-node-test": "error",
            "test/no-only-tests": isInEditor ? "off" : "error",
            "test/prefer-hooks-in-order": "error",
            "test/prefer-lowercase-title": "error",

            "ts/explicit-function-return-type": "off",

            "unicorn/error-message": "off",
            "unicorn/no-useless-undefined": "off",
        },
    }
}
