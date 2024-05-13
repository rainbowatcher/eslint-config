import { interopDefault } from "@rainbowatcher/eslint-config-shared"
import type { EslintFlatConfigItem } from "@rainbowatcher/eslint-config-shared"

export async function setup(): Promise<EslintFlatConfigItem> {
    const pluginTs = await interopDefault(import("@typescript-eslint/eslint-plugin"))

    return {
        name: "rainbowatcher:ts:setup",
        plugins: {
            ts: pluginTs,
        },
    }
}
