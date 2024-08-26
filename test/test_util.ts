import path from "node:path"
import { Linter } from "eslint"
import { it } from "vitest"
import type { EslintFlatConfigItem } from "../packages/shared/src"

type Options = {
    expected?: boolean | string
}

const fixturePath = "test/fixture"

export function createExpectFn(config: EslintFlatConfigItem[], filename?: string) {
    const _filename = filename?.endsWith(".ts") ? path.join(fixturePath, filename) : filename ?? undefined

    const expectRule = (rule: string, input: string, opts?: Options) => {
        const { expected = true } = opts ?? {}

        it(rule, ({ expect }) => {
            const linter = new Linter({ configType: "flat" })
            const result = linter.verify(input, config, { filename: _filename })
            const hasRule = result.some(error => error.ruleId === rule)
            // console.log(rule, result, hasRule === expected)
            const errMsg = `
Rule: ${rule}
Source: ${input}
Result: ${hasRule === expected}
Message:${JSON.stringify(result, null, 2)}
            `
            expect(hasRule, errMsg).toBe(expected)
        })
    }

    const formatCode = (code: string): string => {
        const linter = new Linter({ configType: "flat" })
        const result = linter.verifyAndFix(code, config, { filename: _filename })
        return result.output
    }

    return {
        expectRule,
        formatCode,
    }
}
