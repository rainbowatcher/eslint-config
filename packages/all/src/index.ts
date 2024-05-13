import { ignoreConfigs } from "@rainbowatcher/eslint-config-ignore"
import { jsConfigs } from "@rainbowatcher/eslint-config-js"
import { jsonConfigs } from "@rainbowatcher/eslint-config-json"
import { mdConfigs } from "@rainbowatcher/eslint-config-md"
import { prettierConfigs } from "@rainbowatcher/eslint-config-prettier"
import { tsConfigs } from "@rainbowatcher/eslint-config-ts"
import { vueConfigs } from "@rainbowatcher/eslint-config-vue"
import { composer } from "eslint-flat-config-utils"
import type { EslintFlatConfigItem, Options } from "@rainbowatcher/eslint-config-shared"
import type { FlatConfigComposer } from "eslint-flat-config-utils"

export function defineConfig(opts: Options): FlatConfigComposer<EslintFlatConfigItem> {
    const {
        css, graphql, json, markdown, style, typescript, vue, yaml,
    } = opts
    const configs = [
        ...ignoreConfigs(opts),
        ...jsConfigs(opts),
    ]
    if (typescript) configs.push(...tsConfigs(opts))
    if (json) configs.push(...jsonConfigs(opts))
    if (markdown) configs.push(...mdConfigs(opts))
    if (vue) configs.push(...vueConfigs(opts))
    if (style && (css || yaml || markdown || graphql)) configs.push(...prettierConfigs(opts))
    return composer(...configs).onResolved(cs => cs.filter(c => Object.keys(c).length > 0))
}
