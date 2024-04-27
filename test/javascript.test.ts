import { createExpectFn } from "./test-util"

const { expectRule, expectStyle } = await createExpectFn("javascript")

// ## Types
expectRule("no-var", "var foo = 1")
// Disallow expressions where the operation doesn't affect the value
expectRule("no-constant-binary-expression", "const value3 = !foo == null")
expectRule("no-constant-binary-expression", "const objIsEmpty = someObj === {}") // never equal
expectRule("no-constant-binary-expression", "const arrIsEmpty = someArr === []") // never equal
expectRule("constructor-super", "class A extends B { constructor() { } }")
expectRule("object-shorthand", "const foo = { a: a, b: \"foo\" };")
expectRule("object-shorthand", "const foo = { w: function() {}, x: function *() {}, [y]: function() {}, z: z }")
// # Styles
expectStyle("style/space-infix-ops", "const foo =5", { expected: "const foo = 5\n" })
expectStyle("style/quotes", "const foo = 'bar'", { expected: "const foo = \"bar\"\n" })
expectStyle("style/quotes", "const foo = `bar`", { expected: "const foo = \"bar\"\n" })
// Objects
expectStyle("style/object-curly-newline", `const foo1 = { 
  foo: "bar" }`, { expected: "const foo1 = { foo: \"bar\" }\n" })
expectStyle("style/object-curly-newline", `
const foo1 = { 
  foo: "bar" }`, {
    expected: `
const foo1 = { foo: \"bar\" }\n`,
})

expectRule("no-control-regex", "const RE = /[\u0000-\u001F\"#$&*+,:;<=>?[\\]^`{|}\u007F]/g", { expected: false })

expectRule("no-await-in-loop", `
for (const item in [() => new Promise(() => {})]) {
  await item()
}`)
