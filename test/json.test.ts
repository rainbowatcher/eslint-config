import dedent from "dedent"
import { concat } from "eslint-flat-config-utils"
import jsConfigs from "packages/javascript/src"
import jsonConfigs from "packages/json/src"
import { describe, it } from "vitest"
import { createExpectFn } from "./__util__/test_util"


const opts = { json: true, style: true }
const configs = await concat(...jsConfigs(opts), ...jsonConfigs(opts), {
    rules: {
        "style-js/eol-last": "off",
    },
})
const { expectRule, formatCode } = createExpectFn(configs, "_.json")

describe.concurrent("json", () => {
    expectRule("jsonc/array-bracket-spacing", '{ "foo": [ 1,2,3 ]}')
    expectRule("jsonc/array-bracket-newline", `{ "foo": [ 1,
        2,3 ]}`, { expected: false })
    expectRule("jsonc/array-element-newline", '{ "foo": [ 1,2,3 ]}', { expected: false })
    expectRule("jsonc/comma-dangle", '{ "foo": 1, }', { expected: false })
    expectRule("jsonc/quotes", "{ 'foo': 'bar' }", { expected: true })
    expectRule("style-js/lines-around-comment", `{
        // comment
        foo: "bar"
    }`, { expected: false })
})

describe.concurrent("style", () => {
    it("quotes", ({ expect }) => {
        const code = "{ 'foo': 'bar' }"
        expect(formatCode(code)).toBe(`{ "foo": "bar" }`)
        const code1 = "{ foo: 'bar' }"
        expect(formatCode(code1)).toBe(`{ "foo": "bar" }`)
        const code2 = "{ foo: 1 }"
        expect(formatCode(code2)).toBe(`{ "foo": 1 }`)
    })

    it("bracket-spacing", ({ expect }) => {
        const code = "{'foo': 'bar'}"
        expect(formatCode(code)).toBe(`{ "foo": "bar" }`)
    })

    it("array-bracket-spacing", ({ expect }) => {
        const code = '{"foo": [ 1,2,3 ]}'
        expect(formatCode(code)).toBe(`{ "foo": [1, 2, 3] }`)
    })

    it("array-bracket-newline", ({ expect }) => {
        const code = dedent`
            {
                "foo": [
                    1, 2, 3
                ]
            }
        `
        expect(formatCode(code)).toBe(dedent`
            {
                "foo": [
                    1, 2, 3
                ]
            }
        `)
    })

    it("array-element-newline", ({ expect }) => {
        const code = "[1, 2, 3]"
        expect(formatCode(code)).toBe("[1, 2, 3]")
    })

    it("comma-dangle", ({ expect }) => {
        const code = dedent`
            {
                'foo': 'bar',
            }
        `
        expect(formatCode(code)).toBe(dedent`
            {
                "foo": "bar",
            }
        `)
    })

    it("style-js/lines-around-comment", ({ expect }) => {
        const code = dedent`
            {
                // comment
                foo: "bar"
            }
        `
        expect(formatCode(code)).toBe(dedent`
            {
                // comment
                "foo": "bar"
            }
        `)
    })

    it("indent", ({ expect }) => {
        const code = dedent`
            {
            foo: "bar"
            }
        `
        expect(formatCode(code)).toBe(dedent`
            {
                "foo": "bar"
            }
        `)
    })
})
