import type { Options } from "prettier"

export const DefaultPrettierOptions: Options = {
    arrowParens: "avoid",
    bracketSameLine: false,
    bracketSpacing: true,
    embeddedLanguageFormatting: "off",
    endOfLine: "lf",
    htmlWhitespaceSensitivity: "css",
    jsxSingleQuote: true,
    printWidth: 120,
    proseWrap: "preserve",
    quoteProps: "as-needed",
    rangeEnd: Number.POSITIVE_INFINITY,
    rangeStart: 0,
    semi: false,
    singleAttributePerLine: false,
    singleQuote: false,
    tabWidth: 4,
    trailingComma: "all",
    useTabs: false,
    vueIndentScriptAndStyle: false,
}
