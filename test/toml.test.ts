import dedent from "dedent"
import { concat } from "eslint-flat-config-utils"
import { describe, it } from "vitest"
import { createExpectFn } from "./__util__/test_util"
import jsConfigs from "../packages/javascript/src"
import tomlConfigs from "../packages/toml/src"


const opts = { style: true, toml: true }
const configs = await concat(...jsConfigs(opts), ...tomlConfigs(opts))
const { expectRule, formatCode } = createExpectFn(configs, "_.toml")

describe.concurrent("rules", () => {
    expectRule("toml/key-spacing", '"bad"="bar"')
})

describe.concurrent("format", () => {
    it("spacing", ({ expect }) => {
        const code = dedent`
            bad="bar"
        `
        expect(formatCode(code)).toBe(`bad = "bar"\n`)
    })
})
