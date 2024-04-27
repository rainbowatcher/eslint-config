import { describe } from "vitest"
import { createExpectFn } from "./test-util"

const { expectRule } = await createExpectFn("json")

describe("json", () => {
    expectRule("jsonc/quotes", "{ 'foo': 'bar' }")
})
