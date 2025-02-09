import process from "node:process"
import {
    GLOB_TS, GLOB_TSX, GLOB_VUE, interopDefault,
    resolveAltOption,
} from "@rainbowatcher/eslint-config-shared"
import type { EslintFlatConfigItem, Options } from "@rainbowatcher/eslint-config-shared"
import type { Linter } from "eslint"

const DEFAULT_TS_OPTIONS = {
    tsconfigPath: "tsconfig.json",
    typeAware: true,
}

export async function tsParserConfig(opts: Options): Promise<EslintFlatConfigItem> {
    const files = [GLOB_TS]
    const typescriptOpts = resolveAltOption(opts, "typescript", DEFAULT_TS_OPTIONS)
    const componentExts = []
    if (opts.vue) {
        files.push(GLOB_VUE)
        componentExts.push("vue")
    }
    if (opts.jsx) {
        files.push(GLOB_TSX)
        componentExts.push("tsx")
    }
    return await makeParser({
        componentExts,
        files,
        parserOptions: {
            ecmaFeatures: { jsx: true },
        },
        ...typescriptOpts,
    })
}

type MakeParserOptions = {
    componentExts?: string[]
    files: string[]
    ignores?: string[]
    parserOptions?: Linter.ParserOptions
    tsconfigPath?: string
    typeAware?: boolean
}

async function makeParser(opts: MakeParserOptions): Promise<EslintFlatConfigItem> {
    const parserTs = await interopDefault(import("@typescript-eslint/parser"))
    const {
        componentExts, files, ignores, parserOptions, tsconfigPath, typeAware,
    } = opts
    return {
        files,
        ...ignores ? { ignores } : {},
        languageOptions: {
            parser: parserTs,
            parserOptions: {
                extraFileExtensions: componentExts?.map(ext => `.${ext}`),
                sourceType: "module",
                ...typeAware
                    ? {
                        project: tsconfigPath,
                        tsconfigRootDir: process.cwd(),
                    }
                    : {},
                ...parserOptions as any,
            },
        },
        name: `rainbowatcher:ts:${typeAware ? "type-aware-parser" : "parser"}`,
    }
}
