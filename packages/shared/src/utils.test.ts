import { describe, expect, it } from "vitest"
import { resolveAltOption } from "./utils"


describe("resolveAltOption", () => {
    const defaultValue = {
        indent: 4, quote: "double", semi: false, trailingComma: true, useTabs: false,
    } as const
    it("should return the default value when the option is undefined", () => {
        const opts = { style: undefined }
        const result = resolveAltOption(opts, "style", defaultValue)
        expect(result).toEqual(defaultValue)
    })

    it("should return the {} when the option is a falsy value", () => {
        const opts = { style: false }
        const result = resolveAltOption(opts, "style", defaultValue)
        expect(result).toEqual({})
    })

    it("should return the option value when it is a truthy value", () => {
        const opts = { style: true }
        const result = resolveAltOption(opts, "style", defaultValue)
        expect(result).toEqual(defaultValue)
    })

    it("should return the same object when it is a object", () => {
        const opts = {
            style: {
                indent: 4, quote: "double", semi: true, trailingComma: true, useTabs: false,
            },
        } as const
        const result = resolveAltOption(opts, "style", defaultValue)
        expect(result).toEqual(opts.style)
    })

    it("should return the same object when it is a object", () => {
        const opts = {
            style: {
                indent: 4,
            },
        } as const
        const result = resolveAltOption(opts, "style", defaultValue)
        expect(result).toEqual(opts.style)
    })

    it("should return the {} when it is a truthy value", () => {
        const opts = { style: true }
        const result = resolveAltOption(opts, "style")
        expect(result).toEqual({})
    })

    it("should return the {} when it is a falsy value", () => {
        const opts = { style: false }
        const result = resolveAltOption(opts, "style")
        expect(result).toEqual({})
    })

    it("should return the {} when it is undefined", () => {
        const opts = { style: undefined }
        const result = resolveAltOption(opts, "style")
        expect(result).toEqual({})
    })

    it("should return the same object when it is a object", () => {
        const opts = { style: { indent: 2 } }
        const result = resolveAltOption(opts, "style")
        expect(result).toEqual({ indent: 2 })
    })

    it("should return the {} when it is a truthy value", () => {
        const opts = { style: true }
        const result = resolveAltOption(opts, "typescript")
        expect(result).toEqual({})
    })
})
