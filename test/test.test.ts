import dedent from "dedent"
import { concat } from "eslint-flat-config-utils"
import { jsConfigs } from "packages/javascript/src"
import { describe, it } from "vitest"
import { createExpectFn } from "./test_util"

const configs = await concat(...jsConfigs({ style: true }))
const { expectRule, formatCode } = createExpectFn(configs, "_.test.js")

describe.concurrent("rules", () => {
    expectRule("test/no-import-node-test", dedent`
        import { test } from "node:test"
    `)
})

describe.concurrent("style", () => {
    it("fix node:test", ({ expect }) => {
        const code = dedent`
            import { test } from "node:test"

            test("foo", () => {})
        `
        expect(formatCode(code)).toBe(dedent`
            import { it } from "vitest"

            it.todo("foo")\n
        `)
    })
})
