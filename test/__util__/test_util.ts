import path from "node:path"
import { Linter } from "eslint"
import { it } from "vitest"
import type { EslintFlatConfigItem } from "../../packages/shared/src"

type Options = {
    expected?: boolean | string
}

const fixturePath = "test/fixture"

export function createExpectFn(config: EslintFlatConfigItem[], filename?: string) {
    const _filename = filename && path.join(fixturePath, filename)
    const linter = new Linter({
        configType: "flat",
        // @ts-expect-error unknown field https://eslint.org/docs/latest/flags/
        flags: ["test_only"],
    })

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
        const { output } = linter.verifyAndFix(code, config, _filename)
        return output
    }

    return {
        expectRule,
        formatCode,
    }
}


let a: string | undefined
let b: string | undefined
let c: string | undefined
a || (b && c)
