const expect = require("./test-util")("typescript")

expect("@typescript-eslint/adjacent-overload-signatures", `type Foo = {
  foo(s: string): void;
  foo(n: number): void;
  bar(): void;
  foo(sn: string | number): void;
}`)

expect("@typescript-eslint/ban-types", "type foo = String")
expect("@typescript-eslint/ban-types", "type foo = string", false)
expect("@typescript-eslint/ban-types", "type foo = Number")
expect("@typescript-eslint/ban-types", "type foo = number", false)
expect("@typescript-eslint/ban-types", "type foo = Boolean")
expect("@typescript-eslint/ban-types", "type foo = boolean", false)
expect("@typescript-eslint/ban-types", "type foo = Symbol")
expect("@typescript-eslint/ban-types", "type foo = symbol", false)
expect("@typescript-eslint/ban-types", "type foo = Object")
expect("@typescript-eslint/ban-types", "type foo = {}")
expect("@typescript-eslint/ban-types", "type foo = object")
expect("@typescript-eslint/ban-types", "type foo = Record<string, unknown>", false)
expect("@typescript-eslint/ban-types", "type foo = BigInt")
expect("@typescript-eslint/ban-types", "type foo = bigint", false)
expect("@typescript-eslint/ban-types", "type foo = Function")
expect("@typescript-eslint/ban-types", "type foo = () => void", false)

// expect("@typescript-eslint/no-explicit-any", "const a = {}")

expect("@typescript-eslint/space-infix-ops", "const foo =5")
// expectErr("@typescript-eslint/naming-convention", "var FOO = 1")
// expectErr("@typescript-eslint/naming-convention", "let FOO = 2")
// expectErr("@typescript-eslint/naming-convention", "const FOO = 2", false)