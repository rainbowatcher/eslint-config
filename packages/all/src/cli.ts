import { exec } from "node:child_process"
import fs from "node:fs/promises"
import process from "node:process"
import { detectPackageManager } from "@antfu/install-pkg"
import * as p from "@clack/prompts"
import detectIndent from "detect-indent"
import { loadPackageJSON } from "local-pkg"
import { builders, loadFile, writeFile } from "magicast"
import c from "picocolors"
import { version } from "../../../package.json"
import {
    abbrs, configPrefix, legacyEslintConfigNames, modules, prettierLintLangs, validEslintConfigNames,
} from "./consts"
import type { CliContext, Module } from "./types"

function assertCancel<T>(result: symbol | T): T {
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
            active: "Yes",
            inactive: "No",
            initialValue: true,
            message: "not found eslint config, create a new one?",
        })
        if (!assertCancel(createConfig)) {
            // when not create config, exit
            p.outro(c.red("legacy config file format is not supported"))
            process.exit(1)
        }
    } else if (isLegacy) {
        const createConfig = await p.confirm({
            active: "Yes",
            inactive: "No",
            initialValue: true,
            message: "you are using legacy eslint config, replace with modern eslint config?",
        })
        if (assertCancel(createConfig)) {
            // delete legacy config file
            ctx.legacyConfigPath = fullPath!
        } else {
            // not supported, exit\
            p.outro(c.red("legacy config file format is not supported"))
            process.exit(1)
        }
    } else {
        ctx.configPath = `${process.cwd()}/${filename}`
    }
}

async function handleOptions(ctx: CliContext) {
    await p.confirm({
        active: "Yes",
        inactive: "No",
        initialValue: true,
        message: "use typescript?",
    }).then(use => assertCancel(use) && (ctx.configOptions.typescript = true))

    await p.select({
        initialValue: "vue",
        message: "select project framework",
        options: [
            { label: "Vue", value: "vue" },
            { label: "None", value: "" },
        ],
    }).then(use => assertCancel(use) === "vue" && (ctx.configOptions.vue = true))

    await p.confirm({
        active: "Yes",
        inactive: "No",
        initialValue: true,
        message: "use style formatters?",
    }).then(use => assertCancel(use) && (ctx.configOptions.style = true))

    await p.confirm({
        active: "Yes",
        inactive: "No",
        initialValue: true,
        message: "use json?",
    }).then(use => assertCancel(use) && (ctx.configOptions.json = true))

    await p.confirm({
        active: "Yes",
        inactive: "No",
        initialValue: true,
        message: "use css?",
    }).then(use => assertCancel(use) && (ctx.configOptions.css = true))

    await p.confirm({
        active: "Yes",
        inactive: "No",
        initialValue: true,
        message: "use markdown?",
    }).then(use => assertCancel(use) && (ctx.configOptions.markdown = true))

    await p.confirm({
        active: "Yes",
        inactive: "No",
        initialValue: false,
        message: "use unocss?",
    }).then(use => assertCancel(use) && (ctx.configOptions.unocss = true))

    await p.confirm({
        active: "Yes",
        inactive: "No",
        initialValue: false,
        message: "use yaml?",
    }).then(use => assertCancel(use) && (ctx.configOptions.yaml = true))

    await p.confirm({
        active: "Yes",
        inactive: "No",
        initialValue: false,
        message: "use toml?",
    }).then(use => assertCancel(use) && (ctx.configOptions.toml = true))
}

async function generateCode(ctx: CliContext) {
    const isConfigExists = await fileExists(ctx.configPath)
    if (ctx.legacyConfigPath) await fs.rm(ctx.legacyConfigPath)
    if (!isConfigExists) await fs.writeFile(ctx.configPath, "")
    const file = await loadFile(ctx.configPath)
    file.imports.$add({ from: "@rainbowatcher/eslint-config", imported: "defineConfig" })

    file.exports.default = builders.functionCall("defineConfig", ctx.configOptions)

    await writeFile(file, ctx.configPath, {
        quote: "double", tabWidth: 4, trailingComma: true, useTabs: false,
    })
}

async function handleDeps(ctx: CliContext) {
    const packageJsonPath = `${process.cwd()}/package.json`
    const indent = await getPkgIndent(packageJsonPath)

    for (const [opt, val] of Object.entries(ctx.configOptions)) {
        if (opt === "style" && val && prettierLintLangs.some(lang => ctx.configOptions[lang])) {
            ctx.deps.add(`${configPrefix}-prettier`)
        }
        if (modules.includes(opt as Module)) {
            const abbr = abbrs[opt as keyof typeof abbrs] ?? opt
            val && ctx.deps.add(`${configPrefix}-${abbr}`)
        }
    }

    if (!ctx.pkgJson.devDependencies) {
        ctx.pkgJson.devDependencies = {}
    }

    for await (const dep of ctx.deps) {
        ctx.pkgJson.devDependencies[dep] = `^${version}`
    }

    const confirm = await p.confirm({
        active: "Yes",
        inactive: "No",
        initialValue: true,
        message: "install dependencies?",
    })
    if (assertCancel(confirm)) {
        await fs.writeFile(packageJsonPath, JSON.stringify(ctx.pkgJson, null, indent))
        ctx.spinner.start("installing deps")
        const pm = await detectPackageManager() ?? "pnpm"
        await new Promise((resolve, reject) => {
            exec(`${pm} install --silent`, (error, stdout, stderr) => {
                if (error) {
                    reject(error)
                    return
                }

                ctx.spinner.stop("deps installed")
                resolve(stdout ?? stderr)
            })
        })
    }
}

async function getPkgIndent(packageJsonPath: string): Promise<number> {
    let indent = -1
    try {
        const content = await fs.readFile(packageJsonPath)
        indent = detectIndent(content.toString("utf8")).amount
        return indent
    } catch {
        return indent
    }
}

async function main() {
    const pkgJson = await loadPackageJSON(process.cwd())
    if (!pkgJson) {
        throw new Error("`package.json` not found, please init project first")
    }

    const ctx: CliContext = {
        configOptions: {
            gitignore: true,
        },
        configPath: "eslint.config.js",
        deps: new Set([
            `${configPrefix}-ignore`,
            `${configPrefix}-js`,
            `${configPrefix}`,
        ]),
        pkgJson,
        spinner: p.spinner(),
    }

    p.intro(c.bgBlue(c.bold(` @rainbowatcher/eslint-config ${version} `)))
    await handleConfigName(ctx)
    await handleOptions(ctx)
    await handleDeps(ctx)
    await generateCode(ctx)
    p.outro(c.bgGreen(" all done! "))
}


await main()
