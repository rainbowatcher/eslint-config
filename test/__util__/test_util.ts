import path from "node:path"
import { Linter } from "eslint"
import { expect, it } from "vitest"
import type { EslintFlatConfigItem } from "../../packages/shared/src"

type Options = {
    expected?: boolean | string
}

const fixturePath = "test/fixture"

export function createExpectFn(config: EslintFlatConfigItem[], filename?: string) {
    const _filename = filename?.endsWith(".ts") ? path.join(fixturePath, filename) : filename ?? undefined
    const linter = new Linter({ configType: "flat" })

    const expectRule = (rule: string, input: string, opts?: Options) => {
        const { expected = true } = opts ?? {}

        it(rule, ({ expect }) => {
            const result = linter.verify(input, config, _filename)
            const hasRule = result.some(error => error.ruleId === rule)
            // console.log(rule, result, hasRule === expected)
            const errMsg = `\
Rule: ${rule}
Source: ${input}
Result: ${hasRule === expected}
Message:${JSON.stringify(result, null, 2)}
`
            expect(hasRule, errMsg).toBe(expected)
        })
    }

    const formatCode = (code: string): string => {
        const { fixed, messages, output } = linter.verifyAndFix(code, config, _filename)
        expect(fixed, JSON.stringify(messages, null, 2)).toBeTruthy()
        return output
    }

    return {
        expectRule,
        formatCode,
    }
}
