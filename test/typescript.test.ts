import { createExpectFn } from "./test-util"

const { expectRule } = await createExpectFn("typescript")

expectRule("ts/adjacent-overload-signatures", `type Foo = {
  foo(s: string): void;
  foo(n: number): void;
  bar(): void;
  foo(sn: string | number): void;
}`)

expectRule("ts/ban-types", "type foo = String")
expectRule("ts/ban-types", "type foo = string", { expected: false })
expectRule("ts/ban-types", "type foo = Number")
expectRule("ts/ban-types", "type foo = number", { expected: false })
expectRule("ts/ban-types", "type foo = Boolean")
expectRule("ts/ban-types", "type foo = boolean", { expected: false })
expectRule("ts/ban-types", "type foo = Symbol")
expectRule("ts/ban-types", "type foo = symbol", { expected: false })
expectRule("ts/ban-types", "type foo = Object")
expectRule("ts/ban-types", "type foo = {}", { expected: false })
expectRule("ts/ban-types", "type foo = object")
expectRule("ts/ban-types", "type foo = Record<string, unknown>", { expected: false })
expectRule("ts/ban-types", "type foo = BigInt")
expectRule("ts/ban-types", "type foo = bigint", { expected: false })
expectRule("ts/ban-types", "type foo = Function")
expectRule("ts/ban-types", "type foo = () => void", { expected: false })

// expectRule("ts/no-explicit-any", "const a = {}")

expectRule("style/space-infix-ops", "const foo =5")

expectRule("ts/naming-convention", "var FOO = 1")
expectRule("ts/naming-convention", "let FOO = 2")
expectRule("ts/naming-convention", "const FOO = 2", { expected: false })

expectRule("style/type-annotation-spacing", "type Foo3 = { name:string }")
expectRule("style/type-annotation-spacing", "type Foo3 = { name : string }")
expectRule("style/type-annotation-spacing", "type Foo3 = { name: string }", { expected: false })
