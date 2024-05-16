import type { modules, prettierLintLangs } from "./consts"
import type { spinner } from "@clack/prompts"
import type { Options } from "@rainbowatcher/eslint-config-shared"
import type { PackageJson } from "pkg-types"

export type CliContext = {
    configOptions: Partial<Options>
    configPath: string
    deps: Set<string>
    legacyConfigPath?: string
    pkgJson: PackageJson
    spinner: ReturnType<typeof spinner>
}

export type Module = typeof modules[number]
export type PrettierLintLang = typeof prettierLintLangs[number]
