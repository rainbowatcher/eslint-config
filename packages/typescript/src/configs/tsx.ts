import { GLOB_TSX } from "@rainbowatcher/eslint-config-shared"
import { namingConvertion } from "../naming_convertion"
import type { EslintFlatConfigItem } from "@rainbowatcher/eslint-config-shared"

export function tsx(): EslintFlatConfigItem {
    return {
        files: [GLOB_TSX],
        name: "rainbowatcher:ts:tsx",
        rules: {
            ...namingConvertion(true),
        },
    }
}

export default tsx
