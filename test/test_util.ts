import { Linter } from "eslint"
import { expect, it } from "vitest"
import type { EslintFlatConfigItem } from "../packages/shared/src"

type Options = {
    expected?: boolean | string
}

const fixturePath = "test/fixture/"

export function createExpectFn(config: EslintFlatConfigItem[], filePattern?: string) {
    const expectRule = (rule: string, input: string, opts?: Options) => {
        const { expected = true } = opts ?? {}
        const file = filePattern ? fixturePath + filePattern : undefined

        it(rule, () => {
            const linter = new Linter({ configType: "flat" })
            const result = linter.verify(input, config, file)
            const hasRule = result.some(error => error.ruleId === rule)
            const errMsg = `Expected rule: ${rule}\n\nSource: ${input}\n\nLint message:${JSON.stringify(result, null, 2)}`
            expect(hasRule, errMsg).toBe(expected)
        })
    }

    const formatCode = (code: string): string => {
        const linter = new Linter({ configType: "flat" })
        const file = filePattern ? fixturePath + filePattern : undefined
        const result = linter.verifyAndFix(code, config, file)
        return result.output
    }

    return {
        expectRule,
        formatCode,
    }
}
