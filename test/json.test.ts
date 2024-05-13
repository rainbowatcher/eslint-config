import { concat } from "eslint-flat-config-utils"
import { jsonConfigs } from "packages/json/src"
import { describe, expect, it } from "vitest"
import { createExpectFn, createFormatFn } from "./test_util"

const configs = await concat(...jsonConfigs({ json: true }))
const { expectRule } = createExpectFn(configs, "json")
const formatCode = createFormatFn(configs, "_.json")

describe("json", () => {
    expectRule("jsonc/array-bracket-spacing", '{ "foo": [ 1,2,3 ]}')
    expectRule("jsonc/array-bracket-newline", `{ "foo": [ 1,
        2,3 ]}`, { expected: false })
    expectRule("jsonc/array-element-newline", '{ "foo": [ 1,2,3 ]}', { expected: false })
    expectRule("jsonc/comma-dangle", '{ "foo": 1, }', { expected: false })
    expectRule("jsonc/quotes", "{ 'foo': 'bar' }", { expected: true })
})

describe("style", () => {
    it("quotes", () => {
        const code = "{ 'foo': 'bar' }"
        expect(formatCode(code)).toMatchInlineSnapshot("\"{ \"foo\": \"bar\" }\"")
        const code1 = "{ foo: 'bar' }"
        expect(formatCode(code1)).toMatchInlineSnapshot("\"{ \"foo\": \"bar\" }\"")
        const code2 = "{ foo: 1 }"
        expect(formatCode(code2)).toMatchInlineSnapshot("\"{ \"foo\": 1 }\"")
    })

    it("bracket-spacing", () => {
        const code = "{'foo': 'bar'}"
        expect(formatCode(code)).toMatchInlineSnapshot("\"{ \"foo\": \"bar\" }\"")
    })

    it("array-bracket-spacing", () => {
        const code = '{"foo": [ 1,2,3 ]}'
        expect(formatCode(code)).toMatchInlineSnapshot("\"{ \"foo\": [1,2,3] }\"")
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
          }"
        `)
    })

    it("array-element-newline", () => {
        const code = "[1, 2, 3]"
        expect(formatCode(code)).toMatchInlineSnapshot("\"[1, 2, 3]\"")
    })

    it("comma-dangle", () => {
        const code = `{
            'foo': 'bar',
        }`
        expect(formatCode(code)).toMatchInlineSnapshot(`
          "{
              "foo": "bar",
          }"
        `)
    })
})
