import { describe, expect, it } from "vitest"
import { resolveAltOption } from "./utils"


describe("resolveAltOption", () => {
    const defaultValue = {
        indent: 4, quote: "double", semi: false, trailingComma: "all", useTabs: false,
    } as const
    it("should return the default value when the option is undefined", () => {
        const opts = { style: undefined }
        const result = resolveAltOption(opts, "style", defaultValue)
        expect(result).toStrictEqual(defaultValue)
    })

    it("should return the {} when the option is a falsy value", () => {
        const opts = { style: false }
        const result = resolveAltOption(opts, "style", defaultValue)
        expect(result).toStrictEqual({})
    })

    it("should return the option value when it is a truthy value", () => {
        const opts = { style: true }
        const result = resolveAltOption(opts, "style", defaultValue)
        expect(result).toStrictEqual(defaultValue)
    })

    it("should return the same object when it is a object", () => {
        const opts = {
            style: {
                indent: 4, quote: "double", semi: true, trailingComma: "all", useTabs: false,
            },
        } as const
        const result = resolveAltOption(opts, "style", defaultValue)
        expect(result).toStrictEqual(opts.style)
    })

    it("should return the {} when it is a truthy value", () => {
        const opts = { style: true }
        const result = resolveAltOption(opts, "style")
        expect(result).toStrictEqual({})
    })

    it("should return the {} when it is a falsy value", () => {
        const opts = { style: false }
        const result = resolveAltOption(opts, "style")
        expect(result).toStrictEqual({})
    })

    it("should return the {} when it is undefined without default option", () => {
        const opts = { style: undefined }
        const result = resolveAltOption(opts, "style")
        expect(result).toStrictEqual({})
    })


    it("should return the {} when it is a truthy value without default option", () => {
        const opts = { style: true }
        const result = resolveAltOption(opts, "typescript")
        expect(result).toStrictEqual({})
    })

    it("return object", () => {
        const DEFAULT = {
            tsconfigPath: "tsconfig.json",
            typeAware: true,
        }
        const opts = {
            typescript: {
                typeAware: false,
            },
        }
        const result = resolveAltOption(opts, "typescript", DEFAULT)
        expect(result).toStrictEqual({
            tsconfigPath: "tsconfig.json",
            typeAware: false,
        })
    })
})
