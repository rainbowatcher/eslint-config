const expectErr = require("./test-util")("javascript")

// Types
expectErr("space-infix-ops", "const foo =5")
expectErr("no-constant-binary-expression", "const value1 = +x == null")
expectErr("no-constant-binary-expression", "const value2 = condition ? x : {} || DEFAULT")
expectErr("no-constant-binary-expression", "const value3 = !foo == null")
expectErr("no-constant-binary-expression", "const value4 = new Boolean(foo) === true")
expectErr("no-constant-binary-expression", "const objIsEmpty = someObj === {}")
expectErr("no-constant-binary-expression", "const arrIsEmpty = someArr === []")
// Objects
expectErr("object-shorthand", 'const foo = { a: a, b: "foo" };')
expectErr("object-shorthand", "const foo = { w: function() {}, x: function *() {}, [y]: function() {}, z: z }")
expectErr("quotes", "const foo = 'bar'")
expectErr("quotes", "const foo = `bar`")
expectErr("object-curly-newline", `const foo1 = { 
  foo: "bar" }`)
expectErr("object-curly-newline", `
const foo2 = { 
  foo: "bar" }
`)

expectErr("no-control-regex", "const RE = /[\u0000-\u001F\"#$&*+,:;<=>?[\\]^`{|}\u007F]/g", false)

expectErr("no-await-in-loop", `
for (const item in [() => new Promise(() => {})]) {
  await item()
}`)