import { interopDefault } from "@rainbowatcher/eslint-config-shared"
import type { EslintFlatConfigItem, Options } from "@rainbowatcher/eslint-config-shared"

export async function setup(opts: Options): Promise<EslintFlatConfigItem> {
    if (!opts.toml) return {}

    const pluginToml = await interopDefault(import("eslint-plugin-toml"))

    return {
        name: "rainbowatcher:toml:setup",
        plugins: {
            toml: pluginToml,
        },
    }
}
