/* eslint-disable unicorn/no-process-exit */
import fs from "node:fs/promises"
import process from "node:process"
import { installPackage } from "@antfu/install-pkg"
import * as p from "@clack/prompts"
import { isPackageExists } from "local-pkg"
import { builders, loadFile, writeFile } from "magicast"
import c from "picocolors"
import {
    abbrs, configPrefix, legacyEslintConfigNames, validEslintConfigNames,
} from "./consts"
import type { CliContext } from "./types"

function assertCancel<T>(result: T | symbol): T {
    if (p.isCancel(result)) {
        p.log.warn(c.bgYellow(c.bold(" Canceled ")))
        process.exit(1)
    } else {
        return result
    }
}

async function detectEslintConfig() {
    const files = await Promise.all(validEslintConfigNames.map(async (filename) => {
        const exist = await fileExists(`${process.cwd()}/${filename}`)
        if (exist) {
            return {
                filename,
                fullPath: `${process.cwd()}/${filename}`,
            }
        }
    }))
    const { filename, fullPath } = files.find(f => f?.filename) ?? {}
    let isLegacy = false
    if (filename && legacyEslintConfigNames.includes(filename)) {
        isLegacy = true
    }

    return {
        filename,
        fullPath,
        isLegacy,
    }
}

async function fileExists(filename: string) {
    try {
        await fs.access(filename)
        return true
    } catch {
        return false
    }
}


async function handleConfigName(ctx: CliContext) {
    const { filename, fullPath, isLegacy } = await detectEslintConfig()

    // create config is not exists
    if (!filename) {
        const createConfig = await p.confirm({
            active: "yes",
            message: c.green("not found eslint config, create a new one?"),
        })
        if (!assertCancel(createConfig)) {
            // when not create config, exit
            p.outro(c.red("not supported"))
            process.exit(0)
        }
    } else if (isLegacy) {
        const useLegacy = await p.confirm({
            active: "no",
            message: c.green("you are using legacy eslint config, replace with modern eslint config?"),
        })
        if (assertCancel(useLegacy)) {
            // not supported, exit\
            p.outro(c.red("not supported"))
            process.exit(1)
        } else {
            // delete legacy config file
            await fs.rm(fullPath!)
        }
    } else {
        ctx.configName = filename
    }
}

async function handleOptions(ctx: CliContext) {
    const ts = await p.confirm({
        active: "yes",
        message: "use typescript?",
    })

    if (assertCancel(ts)) {
        ctx.configOptions.typescript = true
    }

    const framework = await p.select({
        initialValue: "vue",
        message: c.green("select project framework"),
        options: [
            { label: "Vue", value: "vue" },
            { label: "None", value: "" },
        ],
    })

    if (assertCancel(framework) === "vue") {
        ctx.configOptions.vue = true
    }

    if (assertCancel(await p.confirm({
        active: "yes",
        message: "enable formatter?",
    }))) {
        ctx.configOptions.style = true
    }

    const json = await p.confirm({
        active: "yes",
        message: c.green("lint json?"),
    })
    assertCancel(json) && (ctx.configOptions.json = true)

    const markdown = await p.confirm({
        active: "yes",
        message: c.green("lint markdown?"),
    })
    assertCancel(markdown) && (ctx.configOptions.markdown = true)

    // const style = await p.multiselect({
    //     cursorAt: "toml",
    //     initialValues: ["css", "json", "markdown", "typescript", "javascript"],
    //     message: c.green("select project style"),
    //     options: [
    //         { label: "JavaScript", value: "javascript" },
    //         { label: "TypeScript", value: "typescript" },
    //         { label: "Markdown", value: "markdown" },
    //         { label: "JSON", value: "json" },
    //         { label: "CSS", value: "css" },
    //         { label: "Jsx", value: "jsx" },
    //         { label: "TOML", value: "toml" },
    //         { label: "Vue", value: "vue" },
    //         { label: "YAML", value: "yaml" },
    //     ],
    // })

    // ctx.configOptions.style = Object.fromEntries(assertCancel(style).map(i => [i, true])) as StyleOptions

    const gitIgnore = await p.confirm({
        active: "yes",
        message: c.green("enable .gitignore intergration?"),
    })
    assertCancel(gitIgnore) && (ctx.configOptions.gitignore = true)
}

async function generateCode(ctx: CliContext) {
    const configPath = `${process.cwd()}/${ctx.configName}`
    const file = await loadFile(configPath)
    file.imports.$add({ from: "@rainbowatcher/eslint-config", imported: "defineConfig" })

    file.exports.default = builders.functionCall("defineConfig", ctx.configOptions)

    await writeFile(file, configPath, {
        quote: "double", tabWidth: 4, trailingComma: true, useTabs: false,
    })
}

async function handleDeps(ctx: CliContext) {
    for (const [opt, val] of Object.entries(ctx.configOptions)) {
        if (["gitignore", "style"].includes(opt)) continue
        const abbr = abbrs[opt as keyof typeof abbrs] ?? opt
        val && ctx.deps.add(`${configPrefix}-${abbr}`)
    }

    for await (const dep of ctx.deps) {
        if (isPackageExists(dep)) {
            p.log.info(`${dep} is installed.`)
        } else {
            ctx.spinner.message(`installing ${dep}...`)
            await installPackage(dep, { silent: true })
        }
    }
}

async function main() {
    const ctx: CliContext = {
        configName: "eslint.config.js",
        configOptions: {},
        deps: new Set([
            "eslint-flat-config-utils",
            `${configPrefix}-ignore`,
            `${configPrefix}-js`,
        ]),
        spinner: p.spinner(),
    }
    p.intro(c.bgBlue(c.bold(" @rainbowatcher/eslint-config ")))

    await handleConfigName(ctx)
    await handleOptions(ctx)
    ctx.spinner.start("installing deps...")
    await handleDeps(ctx)
    ctx.spinner.stop("deps installed")
    ctx.spinner.start("generating code...")
    await generateCode(ctx)
    ctx.spinner.stop("code generated")

    p.outro(c.bgGreen(" all done! "))
}


await main()
