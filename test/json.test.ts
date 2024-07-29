import { concat } from "eslint-flat-config-utils"
import jsConfigs from "packages/javascript/src"
import jsonConfigs from "packages/json/src"
import { describe, expect, it } from "vitest"
import { createExpectFn } from "./test_util"


const opts = { json: true, style: true }
const configs = await concat(...jsConfigs(opts), ...jsonConfigs(opts))
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
    it("quotes", () => {
        const code = "{ 'foo': 'bar' }"
        expect(formatCode(code)).toMatchInlineSnapshot(`
          "{ "foo": "bar" }
          "
        `)
        const code1 = "{ foo: 'bar' }"
        expect(formatCode(code1)).toMatchInlineSnapshot(`
          "{ "foo": "bar" }
          "
        `)
        const code2 = "{ foo: 1 }"
        expect(formatCode(code2)).toMatchInlineSnapshot(`
          "{ "foo": 1 }
          "
        `)
    })

    it("bracket-spacing", () => {
        const code = "{'foo': 'bar'}"
        expect(formatCode(code)).toMatchInlineSnapshot(`
          "{ "foo": "bar" }
          "
        `)
    })

    it("array-bracket-spacing", () => {
        const code = '{"foo": [ 1,2,3 ]}'
        expect(formatCode(code)).toMatchInlineSnapshot(`
          "{ "foo": [1, 2, 3] }
          "
        `)
    })

    it("array-bracket-newline", () => {
        const code = `{
            "foo": [
                1, 2, 3
            ]
        }`
        expect(formatCode(code)).toMatchInlineSnapshot(`
          "{
              "foo": [
                  1, 2, 3
              ]
          }
          "
        `)
    })

    it("array-element-newline", () => {
        const code = "[1, 2, 3]"
        expect(formatCode(code)).toMatchInlineSnapshot(`
          "[1, 2, 3]
          "
        `)
    })

    it("comma-dangle", () => {
        const code = `{
            'foo': 'bar',
        }`
        expect(formatCode(code)).toMatchInlineSnapshot(`
          "{
              "foo": "bar",
          }
          "
        `)
    })

    it("style-js/lines-around-comment", () => {
        const code = `{
            // comment
            foo: "bar"
        }`
        expect(formatCode(code)).toMatchInlineSnapshot(`
          "{
              // comment
              "foo": "bar"
          }
          "
        `)
    })
})
