import path from "node:path"
import { Linter } from "eslint"
import { expect, it } from "vitest"
import { composer } from "eslint-flat-config-utils"
import { interopDefault } from "packages/shared/src"

type Options = {
    fileCategory?: "package-json" | "tsconfig"
    expected?: boolean | string
}

const fixtureMap: Record<string, Record<string, string>> = {
    vue: {
        default: "test/fixture/_.vue",
    },
    typescript: {
        default: "test/fixture/_.ts",
    },
    json: {
        default: "test/fixture/_.json",
        "package.json": "test/fixture/package.json",
    },
    tsconfig: { default: "test/fixture/tsconfig.json" },
}

export async function createExpectFn(config: string) {
    const packageName = path.join(process.cwd(), `packages/${config}/dist/index.js`)
    const module = await interopDefault<Linter.FlatConfig[]>(import(packageName))
    const flatConfig = await composer(...module).toConfigs()

    const expectRule = (rule: string, input: string, opts?: Options) => {
        const { fileCategory, expected = true } = opts ?? {}
        it(`[${rule}] >>> ${input} - ${expected}`, () => {
            let file = fixtureMap[config]?.[fileCategory ?? "default"]
            const linter = new Linter({ configType: "flat" })
            const result = linter.verify(input, flatConfig, file)
            const hasRule = result.some(error => error.ruleId === rule)
            expect(hasRule, JSON.stringify(result, null, 2)).toBe(expected)
        })
    }

    const expectStyle = (rule: string, input: string, opts?: Options) => {
        const { fileCategory, expected = true } = opts ?? {}
        it(`[${rule}] >>> ${input} - ${expected}`, () => {
            let file = fixtureMap[config]?.[fileCategory ?? "default"]
            const linter = new Linter({ configType: "flat" })
            const result = linter.verifyAndFix(input, flatConfig, file)
            expect(result.output, JSON.stringify(result, null, 2)).toEqual(expected)
        })
    }

    return {
        expectRule,
        expectStyle,
    }
}
