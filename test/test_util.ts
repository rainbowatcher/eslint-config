import { Linter } from "eslint"
import { expect, it } from "vitest"
import type { EslintFlatConfigItem } from "../packages/shared/src"

type Options = {
    expected?: boolean | string
    fileCategory?: string
}

const fixturePath = "test/fixture/"

const fixtureMap: Record<string, Record<string, string>> = {
    json: {
        default: "_.json",
        package: "package.json",
        settings: "settings.json",
        tsconfig: "tsconfig.json",
    },
    markdown: {
        default: "_.md",
        ts: "_.md/_.ts",
    },
    typescript: {
        default: "_.ts",
    },
    vue: {
        default: "_.vue",
    },
}
export function createExpectFn(config: EslintFlatConfigItem[], ty?: string) {
    const expectRule = (rule: string, input: string, opts?: Options) => {
        const { expected = true, fileCategory } = opts ?? {}
        const fileName = ty ? fixtureMap[ty]?.[fileCategory ?? "default"] : undefined
        const filePath = fileName ? fixturePath + fileName : undefined

        it(rule, () => {
            const linter = new Linter({ configType: "flat" })
            const result = linter.verify(input, config, filePath)
            const hasRule = result.some(error => error.ruleId === rule)
            expect(hasRule, JSON.stringify(result, null, 2)).toBe(expected)
        })
    }

    const expectStyle = (rule: string, input: string, opts?: Options) => {
        const { expected = true, fileCategory } = opts ?? {}
        const fileName = ty ? fixtureMap[ty]?.[fileCategory ?? "default"] : undefined
        const filePath = fileName ? fixturePath + fileName : undefined

        it(`[${rule}]`, () => {
            const linter = new Linter({ configType: "flat" })
            const result = linter.verifyAndFix(input, config, filePath)
            expect(result.output, JSON.stringify(result, null, 2)).toEqual(expected)
        })
    }

    return {
        expectRule,
        expectStyle,
    }
}

export function createFormatFn(config: EslintFlatConfigItem[], filePattern?: string) {
    return (code: string): string => {
        const linter = new Linter({ configType: "flat" })
        const file = filePattern ? fixturePath + filePattern : undefined
        const result = linter.verifyAndFix(code, config, file)
        return result.output
    }
}
