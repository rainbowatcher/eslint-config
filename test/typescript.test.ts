import dedent from "dedent"
import { concat } from "eslint-flat-config-utils"
import { jsConfigs } from "packages/javascript/src"
import { tsConfigs } from "packages/typescript/src"
import { describe, expect, it } from "vitest"
import { createExpectFn } from "./test_util"

const opts = { style: true, typescript: true }
const configs = await concat(
    ...jsConfigs(opts),
    ...tsConfigs(opts),
    { rules: { "style-js/eol-last": "off" } },
)
const { expectRule, formatCode } = createExpectFn(configs, "_.ts")

describe.concurrent("rules", () => {
    expectRule("ts/adjacent-overload-signatures", dedent`
        type Foo = {
            foo(s: string): void
            foo(n: number): void
            bar(): void
            foo(sn: string | number): void
        }
    `)
    expectRule("ts/no-wrapper-object-types", "type Foo = String")
    expectRule("ts/no-wrapper-object-types", "type Foo = string", { expected: false })
    expectRule("ts/no-wrapper-object-types", "type Foo = Number")
    expectRule("ts/no-wrapper-object-types", "type Foo = number", { expected: false })
    expectRule("ts/no-wrapper-object-types", "type Foo = Boolean")
    expectRule("ts/no-wrapper-object-types", "type Foo = boolean", { expected: false })
    expectRule("ts/no-wrapper-object-types", "type Foo = Symbol")
    expectRule("ts/no-wrapper-object-types", "type Foo = symbol", { expected: false })
    expectRule("ts/no-wrapper-object-types", "type Foo = BigInt")
    expectRule("ts/no-wrapper-object-types", "type Foo = bigint", { expected: false })
    expectRule("ts/no-wrapper-object-types", "type Foo = Object")
    // should use Record<string, unknown> instead of object
    expectRule("ts/no-restricted-types", "type Foo = object")
    expectRule("ts/no-empty-object-type", "type foo = {}", { expected: false })
    expectRule("ts/no-unsafe-function-type", "type foo = Function")
    expectRule("ts/no-unsafe-function-type", "type foo = () => void", { expected: false })
    expectRule("ts/no-restricted-types", "type foo = Record<string, unknown>", { expected: false })
    expectRule("ts/no-restricted-types", "type foo = null")
    expectRule("ts/naming-convention", "var FOO = 1")
    expectRule("ts/naming-convention", "let FOO = 2")
    expectRule("ts/naming-convention", "const FOO = 2", { expected: false })
    expectRule("no-var", "var FOO = 2")
    expectRule("ts/prefer-nullish-coalescing", dedent`
        let a: null | string
        let b: null | string
        a || b
    `)
    expectRule("ts/prefer-nullish-coalescing", dedent`
        let a: null | string
        let b: null | string
        a ?? b
    `, { expected: false })
    expectRule("ts/prefer-nullish-coalescing", dedent`
        let a: null | string
        let b: null | string
        let c: null | string
        a || (b && c)
    `, { expected: false })
    expectRule("ts/prefer-nullish-coalescing", dedent`
        let a: null | string
        let b: null | string
        let c: null | string
        a ?? (b && c)
    `, { expected: false })
    expectRule("ts/prefer-nullish-coalescing", dedent`
        let a: null | string
        let b = a || "a string"
    `)
    expectRule("ts/prefer-nullish-coalescing", dedent`
        let a: null | string
        let b = a ?? "a string"
    `, { expected: false })
    expectRule("style-ts/no-extra-parens", dedent`
        const a = 1
        const foo = a > 1 ? 0 : (a < 1 ? 1 : 2)
    `, { expected: false })
    expectRule("style-ts/no-extra-parens", dedent`
        const a = 1
        const b = 2
        const foo = (a > b) ? a : b
    `, { expected: false })
    // fields without block comment should not be split
    expectRule("style-ts/lines-between-class-members", dedent`
        class Foo {
            private attributes = {}
            private options: object
        }
    `, { expected: false })
    // use block comment to split fields
    expectRule("style-ts/lines-around-comment", dedent`
        class Foo {
            private attributes = {}
            /** comment */
            private options: object
        }
    `)
})

describe.concurrent("style", () => {
    it("type-annotation-spacing", () => {
        const code1 = "type Foo = { name:string }"
        const code2 = "type Foo = { name : string }"
        expect(formatCode(code1)).toMatchInlineSnapshot(`"type Foo = { name: string }"`)
        expect(formatCode(code2)).toMatchInlineSnapshot(`"type Foo = { name: string }"`)
    })

    it("space-infix-ops", () => {
        const code = "const foo =5"
        expect(formatCode(code)).toMatchInlineSnapshot(`"const foo = 5"`)
    })

    it("indent", () => {
        const code = dedent`
            const foo = {
            foo: "bar"
            }
        `
        expect(formatCode(code)).toMatchInlineSnapshot(`
            "const foo = {
                foo: "bar",
            }"
        `)
    })
})
