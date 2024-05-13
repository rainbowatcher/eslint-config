import fs from "node:fs/promises"
import { concat } from "eslint-flat-config-utils"
import { flatConfigsToRulesDTS } from "eslint-typegen/core"
import { jsConfigs } from "packages/javascript/src"
import { jsonConfigs } from "packages/json/src"
import { mdConfigs } from "packages/markdown/src"
import { prettierConfigs } from "packages/prettier/src"
import { tsConfigs } from "packages/typescript/src"
import { vueConfigs } from "packages/vue/src"
import type { Linter } from "eslint"

async function genType(
    configs: Linter.FlatConfig[],
    dist: string,
    extra?: string,
) {
    let dts = await flatConfigsToRulesDTS(configs)
    dts += extra ?? ""
    await fs.writeFile(dist, dts)
}

const opts = {
    json: true, markdown: true, typescript: true, vue: true,
}
const configs = {
    javascript: jsConfigs(opts),
    json: jsonConfigs(opts),
    markdown: mdConfigs(opts),
    prettier: prettierConfigs(opts),
    typescript: tsConfigs(opts),
    vue: vueConfigs(opts),
}

await Promise.all(Object.entries(configs).map(async ([k, v]) => {
    return genType(await concat(...v), `packages/${k}/src/typegen.d.ts`)
}))
