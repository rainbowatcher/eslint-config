import { concat } from "eslint-flat-config-utils"
import { jsConfigs } from "packages/javascript/src"
import { tsConfigs } from "packages/typescript/src"
import { describe, expect, it } from "vitest"
import { createExpectFn, createFormatFn } from "./test_util"

const opts = { style: true, typescript: true }
const configs = await concat(
    ...jsConfigs(opts),
    ...tsConfigs(opts),
    { rules: { "style-js/eol-last": "off" } },
)
const { expectRule } = createExpectFn(configs, "typescript")
const formatCode = createFormatFn(configs, "_.ts")

describe("rules", () => {
    expectRule("ts/adjacent-overload-signatures", `type Foo = {
    foo(s: string): void;
    foo(n: number): void;
    bar(): void;
    foo(sn: string | number): void;
  }`)
    expectRule("ts/ban-types", "type foo = String")
    expectRule("ts/ban-types", "type foo = string", { expected: false })
    expectRule("ts/ban-types", "type foo = Number")
    expectRule("ts/ban-types", "type foo = number", { expected: false })
    expectRule("ts/ban-types", "type foo = Boolean")
    expectRule("ts/ban-types", "type foo = boolean", { expected: false })
    expectRule("ts/ban-types", "type foo = Symbol")
    expectRule("ts/ban-types", "type foo = symbol", { expected: false })
    expectRule("ts/ban-types", "type foo = Object")
    expectRule("ts/ban-types", "type foo = {}", { expected: false })
    expectRule("ts/ban-types", "type foo = object")
    expectRule("ts/ban-types", "type foo = Record<string, unknown>", { expected: false })
    expectRule("ts/ban-types", "type foo = BigInt")
    expectRule("ts/ban-types", "type foo = bigint", { expected: false })
    expectRule("ts/ban-types", "type foo = Function")
    expectRule("ts/ban-types", "type foo = () => void", { expected: false })
    expectRule("ts/ban-types", "type foo = null")
    expectRule("ts/naming-convention", "var FOO = 1")
    expectRule("ts/naming-convention", "let FOO = 2")
    expectRule("ts/naming-convention", "const FOO = 2", { expected: false })
    expectRule("no-var", "var FOO = 2")
})

describe("style", () => {
    it("type-annotation-spacing", () => {
        const code1 = "type Foo = { name:string }"
        const code2 = "type Foo = { name : string }"
        expect(formatCode(code1)).toMatchInlineSnapshot("\"type Foo = { name: string }\"")
        expect(formatCode(code2)).toMatchInlineSnapshot("\"type Foo = { name: string }\"")
    })

    it("space-infix-ops", () => {
        const code = "const foo =5"
        expect(formatCode(code)).toMatchInlineSnapshot("\"const foo = 5\"")
    })
})
