import { interopDefault } from "@rainbowatcher/eslint-config-shared"
import type { EslintFlatConfigItem } from "@rainbowatcher/eslint-config-shared"

export async function setup(): Promise<EslintFlatConfigItem> {
    const pluginPrettier = await interopDefault(import("eslint-plugin-prettier"))
    return {
        name: "rainbowatcher:prettier:setup",
        plugins: {
            prettier: pluginPrettier,
        },
    }
}
