import dedent from "dedent"
import { concat } from "eslint-flat-config-utils"
import { jsConfigs } from "packages/javascript/src"
import { describe, it } from "vitest"
import { createExpectFn } from "./__util__/test_util"

const configs = await concat(
    ...jsConfigs({ style: true }),
    {
        rules: {
            "prefer-const": "off",
            "style-js/eol-last": "off",
            "style-ts/semi": "off",
            "unused-imports/no-unused-imports": "off",
        },
    },
)
const { expectRule, formatCode } = createExpectFn(configs, "_.js")

describe.concurrent("rules", () => {
    expectRule("no-var", "var foo = 1")
    // Disallow expressions where the operation doesn't affect the value
    expectRule("no-constant-binary-expression", "const value3 = !foo == null")
    expectRule("no-constant-binary-expression", "const objIsEmpty = someObj === {}") // never equal
    expectRule("no-constant-binary-expression", "const arrIsEmpty = someArr === []") // never equal
    expectRule("constructor-super", "class A extends B { constructor() { } }")
    expectRule("object-shorthand", 'const foo = { a: a, b: "foo" };')
    expectRule("object-shorthand", "const foo = { w: function() {}, x: function *() {}, [y]: function() {}, z: z }")
    expectRule("no-control-regex", 'const RE = /[\u0000-\u001F"#$&*+,:;<=>?[\\]^`{|}\u007F]/g'/* , { expected: false } */)
    expectRule("no-await-in-loop", dedent`
        for (const item in [() => new Promise(() => {})]) {
            await item()
        }
    `)
    expectRule("regexp/match-any", String.raw`const re = /[\s\S]*/g`)
    expectRule("regexp/match-any", String.raw`const re = /[\S\s]*/g`, { expected: false })
    expectRule("regexp/match-any", "const re = /[^]*/g", { expected: false })
    expectRule("regexp/match-any", "const re = /.*/g", { expected: false })
    expectRule("regexp/no-super-linear-backtracking", String.raw`const re = /([\w-]+)(.*?)>/g`, { expected: false })
    expectRule("regexp/no-trivially-nested-quantifier", String.raw`const re = /(?:a{1,2})+/`, { expected: false })
    expectRule("regexp/no-trivially-nested-quantifier", String.raw`const re = /(\d{2,4}){3}/`, { expected: false })
    expectRule("regexp/no-super-linear-backtracking", String.raw`/\s*(.*?)(?=:)/`, { expected: false })
    expectRule("unicorn/prefer-ternary", dedent`
        function unicorn() {
            if (test) {
                return a;
            } else {
                return b;
            }
        }
    `, { expected: false })
    expectRule("style-js/no-extra-parens", dedent`
        const a = 1
        const foo = a > 1 ? 0 : (a < 1 ? 1 : 2)
    `, { expected: false })
    expectRule("style-js/no-extra-parens", dedent`
        const a = 1;const b = 2
        const foo = (a > b) ? a : b
    `, { expected: false })
    // allow implicit return undefined
    expectRule("array-callback-return", dedent`
        var undefAllTheThings = myArray.map(function(item) {
            return;
        });
    `, { expected: false })
    expectRule("perfectionist/sort-array-includes", dedent`
        const arr = ["foo", "bar", "baz"]
        const baz = [...arr, "a", "b"].includes("foo")
    `)
    expectRule("perfectionist/sort-array-includes", dedent`
        const arr = ["foo", "bar", "baz"]
        const baz = ["a", "b", ...arr].includes("foo")
    `, { expected: false })
    // fields without block comment should not be split
    expectRule("style-js/lines-between-class-members", dedent`
        class Foo {
            attributes = {}
            options = {}
        }
    `, { expected: false })
    // use block comment to split fields
    expectRule("style-js/lines-around-comment", dedent`
        class Foo {
            attributes = {}
            /** comment */
            options = {}
        }
    `)
})

describe.concurrent("style", () => {
    it("space-infix-ops", ({ expect }) => {
        const code = "const foo =5"
        expect(formatCode(code)).toBe("const foo = 5")
    })

    it("quotes", ({ expect }) => {
        const code = "const foo = 'bar'"
        const code1 = "const foo = `bar`"
        const code2 = "const foo = '`bar`'"
        expect(formatCode(code)).toBe(`const foo = "bar"`)
        expect(formatCode(code1)).toBe(`const foo = "bar"`)
        expect(formatCode(code2)).toBe(`const foo = "\`bar\`"`)
    })

    it("object-curly-newline", ({ expect }) => {
        const code = dedent`
            const foo = {
                foo: "bar" }
        `
        expect(formatCode(code)).toBe(`const foo = { foo: "bar" }`)

        const code1 = dedent`
            const foo = {foo:"1", 
                bar: 2, baz: 3
            }
        `
        expect(formatCode(code1)).toBe(dedent`
            const foo = {
                bar: 2,
                baz: 3,
                foo: "1",
            }
        `)
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

    describe.concurrent("perfectionist", () => {
        it("perfectionist/sort-objects", ({ expect }) => {
            const code = dedent`
                const arr = { foo: 1, bar: 2, baz: 3 }
                const arr2 = {
                    foo: 1,
                    bar: 2,
                    baz: 3
                }
                const arr3 = {
                    foo: 1,
    
                    // region
                    bar: 2,
                    baz: 3
                }
                const { foo, bar, baz } = arr
            `
            expect(formatCode(code)).toBe(dedent`
                const arr = { bar: 2, baz: 3, foo: 1 }
                const arr2 = {
                    bar: 2,
                    baz: 3,
                    foo: 1,
                }
                const arr3 = {
                    foo: 1,
    
                    // region
                    bar: 2,
                    baz: 3,
                }
                const { bar, baz, foo } = arr
            `)
        })

        it("perfectionist/sort-imports", ({ expect }) => {
            const code = dedent`
                import axios from 'axios'
                import Button from '~/components/Button'
                import styles from './index.module.css'
                import path from 'path'
                import config from './config'
    
                import './set-production-env.js'
                import formatNumber from '../utils/format-number'
                import main from '.'
                import './styles.scss'
            `
            expect(formatCode(code)).toBe(dedent`
                import path from "node:path"
                import axios from "axios"
                import Button from "~/components/Button"
                import main from "."
                import config from "./config"
                import formatNumber from "../utils/format-number"
                import "./set-production-env.js"
                import "./styles.scss"
                import styles from "./index.module.css"
            `)
        })

        it("perfectionist/sort-classes", ({ expect }) => {
            const code = dedent`
                class Foo {
                    options = {}
                    // region: optional fields
                    bar = {}
                    attributes
                }
            `
            expect(formatCode(code)).toBe(dedent`
                class Foo {
                    options = {}
                    // region: optional fields
                    attributes
                    bar = {}
                }
            `)
        })
    })
})
