import { GLOB_TSX } from "@rainbowatcher/eslint-config-shared"
import { namingConvertion } from "../naming_convertion"
import type { EslintFlatConfigItem, Options } from "@rainbowatcher/eslint-config-shared"

export function tsx(opts: Options): EslintFlatConfigItem {
    if (!opts.jsx) return {}
    return {
        files: [GLOB_TSX],
        name: "rainbowatcher:ts:tsx",
        rules: {
            ...namingConvertion(true),
        },
    }
}
