import { interopDefault } from "@rainbowatcher/eslint-config-shared"
import type { EslintFlatConfigItem } from "@rainbowatcher/eslint-config-shared"

export async function setup(): Promise<EslintFlatConfigItem> {
    const pluginMarkdown = await interopDefault(import("@eslint/markdown"))
    return {
        name: "rainbowatcher:markdown:setup",
        plugins: {
            markdown: pluginMarkdown,
        },
    }
}
