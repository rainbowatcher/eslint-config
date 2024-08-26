import dedent from "dedent"
import { concat } from "eslint-flat-config-utils"
import { jsConfigs } from "packages/javascript/src"
import { tsConfigs } from "packages/typescript/src"
import { describe, it } from "vitest"
import { createExpectFn } from "./test_util"

const opts = { style: true, typescript: true }
const configs = await concat(
    ...jsConfigs(opts),
    ...tsConfigs(opts),
    {
        rules: {
            "no-var": "off",
            "prefer-const": "off",
            "style-js/eol-last": "off",
            "style-ts/semi": "off",
            "unused-imports/no-unused-vars": "off",
        },
    },
)
const { expectRule, formatCode } = createExpectFn(configs, "_.ts")

describe.concurrent("rules", () => {
    // expect base eslint rule is enable in typescript
    expectRule("eqeqeq", "const a = 1;a == 1")
    expectRule("ts/adjacent-overload-signatures", dedent`
        type Foo = {
            foo(s: string): void
            foo(n: number): void
            bar(): void
            foo(sn: number | string): void
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
    expectRule("ts/no-empty-object-type", "type Foo = {}", { expected: false })
    expectRule("ts/no-unsafe-function-type", "type Foo = Function")
    expectRule("ts/no-unsafe-function-type", "type Foo = () => void", { expected: false })
    expectRule("ts/no-restricted-types", "type Foo = Record<string, unknown>", { expected: false })
    expectRule("ts/no-restricted-types", "type Foo = null")
    expectRule("ts/naming-convention", "var FOO = 1")
    expectRule("ts/naming-convention", "let FOO = 2")
    expectRule("ts/naming-convention", "let foo = 2", { expected: false })
    expectRule("ts/naming-convention", "const FOO = 2", { expected: false })
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
            private options: Record<string, unknown>
        }
    `, { expected: false })
    // use block comment to split fields
    expectRule("style-ts/lines-around-comment", dedent`
        class Foo {
            private attributes = {}
            /** comment */
            private options: Record<string, unknown>
        }
    `)
})

describe.concurrent("style", () => {
    it("type-annotation-spacing", ({ expect }) => {
        const code1 = "type Foo = { name:string }"
        const code2 = "type Foo = { name : string }"
        expect(formatCode(code1)).toBe("type Foo = { name: string }")
        expect(formatCode(code2)).toBe("type Foo = { name: string }")
    })

    it("space-infix-ops", ({ expect }) => {
        const code = "const foo =5"
        expect(formatCode(code)).toBe("const foo = 5")
    })

    it("indent", ({ expect }) => {
        const code = dedent`
            const foo = {
            foo: "bar"
            }
        `
        expect(formatCode(code)).toBe(dedent`
            const foo = {
                foo: "bar",
            }
        `)
    })
})
