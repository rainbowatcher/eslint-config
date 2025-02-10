import ignoreConfigs from "@rainbowatcher/eslint-config-ignore"
import jsConfigs from "@rainbowatcher/eslint-config-js"
import { interopDefault, isInEditor } from "@rainbowatcher/eslint-config-shared"
import { composer } from "eslint-flat-config-utils"
import type { EslintFlatConfigItem, Options } from "@rainbowatcher/eslint-config-shared"

export async function defineConfig(opts: Options, ...otherConfigs: EslintFlatConfigItem[]): Promise<EslintFlatConfigItem[]> {
    const {
        css, graphql, json, markdown, style, toml, typescript, unocss, vue, yaml,
    } = opts

    const configs = [
        ...ignoreConfigs(opts),
        ...jsConfigs(opts),
    ]
    if (typescript) {
        const tsConfigs = await interopDefault(import("@rainbowatcher/eslint-config-ts"))
        configs.push(...tsConfigs(opts))
    }
    if (json) {
        const jsonConfigs = await interopDefault(import("@rainbowatcher/eslint-config-json"))
        configs.push(...jsonConfigs(opts))
    }
    if (markdown) {
        const mdConfigs = await interopDefault(import("@rainbowatcher/eslint-config-md"))
        configs.push(...mdConfigs(opts))
    }
    if (vue) {
        const vueConfigs = await interopDefault(import("@rainbowatcher/eslint-config-vue"))
        configs.push(...vueConfigs(opts))
    }
    if (toml) {
        const tomlConfigs = await interopDefault(import("@rainbowatcher/eslint-config-toml"))
        configs.push(...tomlConfigs(opts))
    }
    if (unocss) {
        const unocssConfigs = await interopDefault(import("@rainbowatcher/eslint-config-unocss"))
        configs.push(...unocssConfigs(opts))
    }
    if (style && (css || yaml || markdown || graphql)) {
        const prettierConfigs = await interopDefault(import("@rainbowatcher/eslint-config-prettier"))
        configs.push(...prettierConfigs(opts))
    }
    return composer(...configs)
        .append(...otherConfigs)
        .onResolved(cs => cs.filter(c => Object.keys(c).length > 0))
}

export { isInEditor }
export default defineConfig
