import { getFiles } from "../files"
import type { EslintFlatConfigItem, Options } from "@rainbowatcher/eslint-config-shared"

export function node(opts: Options): EslintFlatConfigItem {
    return {
        files: getFiles({
            ...opts,
            json: false,
        }),
        name: "rainbowatcher:js:node",
        rules: {
            "node/handle-callback-err": ["error", "^(err|error)$"],
            "node/no-deprecated-api": "error",
            "node/no-exports-assign": "error",
            "node/no-new-require": "error",
            "node/no-path-concat": "error",
            "node/prefer-global/buffer": ["error", "never"],
            "node/prefer-global/process": ["error", "never"],
            "node/process-exit-as-throw": "error",
        },
    }
}
