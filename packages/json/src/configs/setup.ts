import { interopDefault } from "@rainbowatcher/eslint-config-shared"
import type { EslintFlatConfigItem } from "@rainbowatcher/eslint-config-shared"

export async function setup(): Promise<EslintFlatConfigItem> {
    const pluginJsonc = await interopDefault(import("eslint-plugin-jsonc"))
    return {
        name: "rainbowatcher:json:setup",
        plugins: {
            jsonc: pluginJsonc,
        },
    }
}
