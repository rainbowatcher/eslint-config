import { GLOB_EXCLUDE } from "@rainbowatcher/eslint-config-shared"
import type { EslintFlatConfigItem } from "@rainbowatcher/eslint-config-shared"

export function base(): EslintFlatConfigItem {
    return { ignores: GLOB_EXCLUDE }
}
