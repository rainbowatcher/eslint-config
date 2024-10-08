import fs from "node:fs/promises"
import { flatConfigsToRulesDTS } from "eslint-typegen/core"
import defineConfig from "packages/all/src"
import p from "picocolors"
import type { Linter } from "eslint"

async function genType(
    configs: Linter.Config[],
    dist: string,
    extra?: string,
) {
    console.log(`${p.green("generated")} ${dist}`)
    let dts = await flatConfigsToRulesDTS(configs, { includeAugmentation: false })
    dts += extra ?? ""
    await fs.writeFile(dist, dts)
}

const configs = await defineConfig({
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
})

await genType(configs, "packages/shared/src/typegen.d.ts")
