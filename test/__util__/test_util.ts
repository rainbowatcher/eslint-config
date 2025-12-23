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
            if (rule === "ts/prefer-nullish-coalescing") {
                console.log("=== DEBUG ts/prefer-nullish-coalescing ===")
                console.log("Rule:", JSON.stringify(rule))
                console.log("Result length:", result.length)
                console.log("Result items:")
                for (const [index, error] of result.entries()) {
                    console.log(`  [${index}]:`, {
                        equal: error.ruleId === rule,
                        ruleId: error.ruleId,
                        ruleIdType: typeof error.ruleId,
                        strictEqual: Object.is(error.ruleId, rule),
                    })
                }
                console.log("hasRule:", hasRule)
                console.log("expected:", expected)
                console.log("=====================================")
            }
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
