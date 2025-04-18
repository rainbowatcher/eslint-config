import { exec } from "node:child_process"
import fs from "node:fs/promises"
import process from "node:process"
import { detectPackageManager } from "@antfu/install-pkg"
import * as p from "@clack/prompts"
import { DEFAULT_STYLE_OPTION, resolveAltOption } from "@rainbowatcher/eslint-config-shared"
import detectIndent from "detect-indent"
import { loadPackageJSON } from "local-pkg"
import { builders, loadFile, writeFile } from "magicast"
import c from "picocolors"
import {
    ABBRS, CONFIG_PREFIX, DEFINE_CONFIG, LEGACY_ESLINT_CONFIG_NAMES, MODULES, PRETTIER_LINT_LANGS,
    VALID_ESLINT_CONFIG_NAMES,
} from "./consts"
import { version } from "../../../package.json"
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
    const files = await Promise.all(VALID_ESLINT_CONFIG_NAMES.map(async (filename) => {
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
    if (filename && LEGACY_ESLINT_CONFIG_NAMES.includes(filename)) {
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
            message: "not found eslint config, create a new one?",
        })
        if (!assertCancel(createConfig)) {
            // when not create config, exit
            p.outro(c.red("legacy config file format is not supported"))
            process.exit(1)
        }
    } else if (isLegacy) {
        const createConfig = await p.confirm({
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
        message: "use style formatters?",
    }).then(use => assertCancel(use) && (ctx.configOptions.style = true))

    await p.confirm({
        message: "use json?",
    }).then(use => assertCancel(use) && (ctx.configOptions.json = true))

    await p.confirm({
        message: "use css?",
    }).then(use => assertCancel(use) && (ctx.configOptions.css = true))

    await p.confirm({
        message: "use markdown?",
    }).then(use => assertCancel(use) && (ctx.configOptions.markdown = true))

    await p.confirm({
        initialValue: false,
        message: "use unocss?",
    }).then(use => assertCancel(use) && (ctx.configOptions.unocss = true))

    await p.confirm({
        initialValue: false,
        message: "use yaml?",
    }).then(use => assertCancel(use) && (ctx.configOptions.yaml = true))

    await p.confirm({
        initialValue: false,
        message: "use toml?",
    }).then(use => assertCancel(use) && (ctx.configOptions.toml = true))
}

async function generateCode(ctx: CliContext) {
    const isConfigExists = await fileExists(ctx.configPath)
    if (ctx.legacyConfigPath) await fs.rm(ctx.legacyConfigPath)
    if (!isConfigExists) await fs.writeFile(ctx.configPath, "")
    const file = await loadFile(ctx.configPath)
    file.imports.$prepend({ from: "@rainbowatcher/eslint-config", imported: DEFINE_CONFIG })

    file.exports.default = builders.functionCall(DEFINE_CONFIG, ctx.configOptions)

    const { singleQuote, tabWidth, trailingComma, useTabs } = resolveAltOption(ctx.configOptions, "style", DEFAULT_STYLE_OPTION)
    await writeFile(file, ctx.configPath, {
        quote: singleQuote ? "single" : "double",
        tabWidth,
        trailingComma: trailingComma === "all",
        useTabs,
    })
}

async function handleDeps(ctx: CliContext) {
    const packageJsonPath = `${process.cwd()}/package.json`
    const styleOption = resolveAltOption(ctx.configOptions, "style")

    const indent = styleOption?.tabWidth ?? await getPkgIndent(packageJsonPath)

    for (const [opt, val] of Object.entries(ctx.configOptions)) {
        // when option key is "style" and the option key in PRETTIER_LINT_LANGS has defined in config
        if (opt === "style" && val && PRETTIER_LINT_LANGS.some(lang => ctx.configOptions[lang])) {
            ctx.deps.add(`${CONFIG_PREFIX}-prettier`)
        }
        // when option key is in MODULES
        if (MODULES.includes(opt as Module)) {
            const abbr = ABBRS[opt as keyof typeof ABBRS] ?? opt
            val && ctx.deps.add(`${CONFIG_PREFIX}-${abbr}`)
        }
    }

    ctx.pkgJson.devDependencies ??= {}

    for (const dep of ctx.deps) {
        ctx.pkgJson.devDependencies[dep] = `^${version}`
    }

    const confirm = await p.confirm({
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
            `${CONFIG_PREFIX}-ignore`,
            `${CONFIG_PREFIX}-js`,
            `${CONFIG_PREFIX}`,
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
