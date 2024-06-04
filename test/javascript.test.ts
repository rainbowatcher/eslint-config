import { concat } from "eslint-flat-config-utils"
import { jsConfigs } from "packages/javascript/src"
import { describe, expect, it } from "vitest"
import { createExpectFn } from "./test_util"

const configs = await concat(...jsConfigs({ style: true }))
const { expectRule, formatCode } = createExpectFn(configs)

describe("rules", () => {
    expectRule("no-var", "var foo = 1")

    // Disallow expressions where the operation doesn't affect the value
    expectRule("no-constant-binary-expression", "const value3 = !foo == null")
    expectRule("no-constant-binary-expression", "const objIsEmpty = someObj === {}") // never equal
    expectRule("no-constant-binary-expression", "const arrIsEmpty = someArr === []") // never equal
    expectRule("constructor-super", "class A extends B { constructor() { } }")
    expectRule("object-shorthand", 'const foo = { a: a, b: "foo" };')
    expectRule("object-shorthand", "const foo = { w: function() {}, x: function *() {}, [y]: function() {}, z: z }")
    expectRule("no-control-regex", 'const RE = /[\u0000-\u001F"#$&*+,:;<=>?[\\]^`{|}\u007F]/g'/* , { expected: false } */)
    expectRule("no-await-in-loop", `
    for (const item in [() => new Promise(() => {})]) {
      await item()
    }`)
    expectRule("regexp/match-any", String.raw`const re = /[\s\S]*/g`)
    expectRule("regexp/match-any", String.raw`const re = /[\S\s]*/g`, { expected: false })
    expectRule("regexp/match-any", "const re = /[^]*/g", { expected: false })
    expectRule("regexp/match-any", "const re = /.*/g", { expected: false })
    expectRule("regexp/no-super-linear-backtracking", String.raw`const re = /([\w-]+)(.*?)>/g`, { expected: false })
    expectRule("regexp/no-trivially-nested-quantifier", String.raw`const re = /(?:a{1,2})+/`, { expected: false })
    expectRule("regexp/no-trivially-nested-quantifier", String.raw`const re = /(\d{2,4}){3}/`, { expected: false })
    expectRule("regexp/no-super-linear-backtracking", String.raw`/\s*(.*?)(?=:)/`, { expected: false })
    expectRule("unicorn/prefer-ternary", `function unicorn() {
        if (test) {
            return a;
        } else {
            return b;
        }
    }`, { expected: false })
})

describe("style", () => {
    it("space-infix-ops", () => {
        const code = "const foo =5"
        expect(formatCode(code)).toMatchInlineSnapshot(`
          "const foo = 5
          "
        `)
    })

    it("quotes", () => {
        const code = "const foo = 'bar'"
        const code1 = "const foo = `bar`"
        const code2 = "const foo = '`bar`'"
        expect(formatCode(code)).toMatchInlineSnapshot(`
          "const foo = "bar"
          "
        `)
        expect(formatCode(code1)).toMatchInlineSnapshot(`
          "const foo = "bar"
          "
        `)
        expect(formatCode(code2)).toMatchInlineSnapshot(`
          "const foo = "\`bar\`"
          "
        `)
    })

    it("object-curly-newline", () => {
        const code = `
        const foo = {
            foo: "bar" }
        `
        expect(formatCode(code)).toMatchInlineSnapshot(`
          "const foo = { foo: "bar" }
          "
        `)

        const code1 = `
        const foo = {foo:"1", 
        bar: 2, baz: 3
        }
        `
        expect(formatCode(code1)).toMatchInlineSnapshot(`
          "const foo = {
              bar: 2,
              baz: 3,
              foo: "1",
          }
          "
        `)
    })
})
