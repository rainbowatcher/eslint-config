import fs from "node:fs/promises"
import { concat } from "eslint-flat-config-utils"
import { flatConfigsToRulesDTS } from "eslint-typegen/core"
import ignoreConfigs from "packages/ignore/src"
import jsConfigs from "packages/javascript/src"
import jsonConfigs from "packages/json/src"
import mdConfigs from "packages/markdown/src"
import prettierConfigs from "packages/prettier/src"
import tsConfigs from "packages/typescript/src"
import unocssConfigs from "packages/unocss/src"
import vueConfigs from "packages/vue/src"
import p from "picocolors"
import type { Linter } from "eslint"
import type { Module } from "packages/all/src/types"
import type { EslintFlatConfigs, Options } from "packages/shared/src"

async function genType(
    configs: Linter.FlatConfig[],
    dist: string,
    extra?: string,
) {
    console.log(`${p.green("generated")} ${dist}`)
    let dts = await flatConfigsToRulesDTS(configs)
    dts += extra ?? ""
    await fs.writeFile(dist, dts)
}

const opts: Required<Options> = {
    css: true,
    gitignore: true,
    graphql: true,
    json: true,
    jsx: true,
    markdown: true,
    style: true,
    toml: true,
    typescript: true,
    unocss: true,
    vue: true,
    yaml: true,
}

const configs: Record<Module, EslintFlatConfigs> = {
    ignore: ignoreConfigs(opts),
    javascript: jsConfigs(opts),
    json: jsonConfigs(opts),
    markdown: mdConfigs(opts),
    prettier: prettierConfigs(opts),
    typescript: tsConfigs(opts),
    unocss: unocssConfigs(opts),
    vue: vueConfigs(opts),
}

await Promise.all(Object.entries(configs).map(async ([k, v]) => {
    return genType(await concat(...v), `packages/${k}/src/typegen.d.ts`)
}))
