import { GLOB_TESTS } from "@rainbowatcher/eslint-config-shared"
import type { EslintFlatConfigItem } from "@rainbowatcher/eslint-config-shared"

export function test(): EslintFlatConfigItem {
    return {
        files: [GLOB_TESTS],
        name: "rainbowatcher:js:test-style",
        rules: {
            "unicorn/error-message": "off",
            "unicorn/no-useless-undefined": "off",
        },
    }
}
