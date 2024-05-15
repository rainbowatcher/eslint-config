import { interopDefault } from "@rainbowatcher/eslint-config-shared"
import type { EslintFlatConfigItem, Options } from "@rainbowatcher/eslint-config-shared"

export async function base(opts: Options): Promise<EslintFlatConfigItem> {
    if (!opts.unocss) return {}

    const pluginUnoCSS = await interopDefault(import("@unocss/eslint-plugin"))

    return {
        name: "rainbowatcher:unocss:rules",
        plugins: {
            unocss: pluginUnoCSS,
        },
        rules: {
            "unocss/blocklist": "error",
            "unocss/order": "warn",
            "unocss/order-attributify": "warn",
        },
    }
}
