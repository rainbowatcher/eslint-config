const fs = require("node:fs")
const path = require("node:path")

const tsconfig = process.env.ESLINT_TSCONFIG || "tsconfig.eslint.json"

module.exports = {
  extends: [
    "@rainbowatcher/eslint-config-js",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint",
  ],
  settings: {
    "import/resolver": {
      node: { extensions: [".js", ".jsx", ".mjs", ".ts", ".tsx", ".d.ts"] },
    },
    "import/parsers": {
      [require.resolve("@typescript-eslint/parser")]: [
        ".ts",
        ".tsx",
      ],
    },
  },
  overrides: !fs.existsSync(path.join(process.cwd(), tsconfig)) ? [] : [{
    parserOptions: {
      tsconfigRootDir: process.cwd(),
      project: [tsconfig],
    },
    extends: ["plugin:@typescript-eslint/recommended"],
    excludedFiles: ["**/*.md/*.*"],
    files: ["*.ts", "*.tsx", "*.mts", "*.cts"],
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended-requiring-type-checking.ts
    rules: {
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-empty-function": "warn",
      "@typescript-eslint/no-var-requires": "error",
      "@typescript-eslint/no-explicit-any": "off",
      "no-throw-literal": "off",
      "@typescript-eslint/no-throw-literal": "error",
      "no-implied-eval": "off",
      "@typescript-eslint/no-implied-eval": "error",
      "dot-notation": "off",
      "@typescript-eslint/dot-notation": ["error", { allowKeywords: true }],
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/no-for-in-array": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      "@typescript-eslint/no-unsafe-argument": "error",
      "@typescript-eslint/no-unsafe-assignment": "error",
      "@typescript-eslint/no-unsafe-call": "error",
      "@typescript-eslint/no-unsafe-member-access": "error",
      "@typescript-eslint/no-unsafe-return": "error",
      "require-await": "off",
      "@typescript-eslint/require-await": "error",
      "@typescript-eslint/restrict-plus-operands": "error",
      "@typescript-eslint/restrict-template-expressions": "error",
      "@typescript-eslint/unbound-method": "error",
    },
  },
  {
    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/unbound-method.md
    files: ["**/__tests__/**/*.ts", "**/*.spec.ts", "**/*.test.ts"],
    plugins: ["jest"],
    rules: {
      // you should turn the original rule off *only* for test files
      "@typescript-eslint/unbound-method": "off",
      "jest/unbound-method": "error",
    },
  },
  {
    files: [
      "**/*.d.ts",
    ],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
    },
  }],

  rules: {
    // # 10. Modules
    "import/no-unresolved": "off",
    "no-empty-function": "off",
    "import/named": "off",
    "no-duplicate-imports": "off",
    "@typescript-eslint/consistent-type-imports": ["error", {
      prefer: "type-imports",
      disallowTypeAnnotations: false,
    }],
    // ref: https://github.com/xojs/eslint-config-xo-typescript/blob/main/index.js
    "@typescript-eslint/ban-types": [
      "error",
      {
        extendDefaults: false,
        types: {
          String: {
            message: "Use `string` instead.",
            fixWith: "string",
          },
          Number: {
            message: "Use `number` instead.",
            fixWith: "number",
          },
          Boolean: {
            message: "Use `boolean` instead.",
            fixWith: "boolean",
          },
          Symbol: {
            message: "Use `symbol` instead.",
            fixWith: "symbol",
          },
          BigInt: {
            message: "Use `bigint` instead.",
            fixWith: "bigint",
          },
          Object: {
            message: "The `Object` type is mostly the same as `unknown`. You probably want `Record<string, unknown>` instead. See https://github.com/typescript-eslint/typescript-eslint/pull/848",
            fixWith: "Record<string, unknown>",
          },
          "{}": {
            message: "The `{}` type is mostly the same as `unknown`. You probably want `Record<string, unknown>` instead.",
            fixWith: "Record<string, unknown>",
          },
          object: {
            message: "The `object` type is hard to use. Use `Record<string, unknown>` instead. See: https://github.com/typescript-eslint/typescript-eslint/pull/848",
            fixWith: "Record<string, unknown>",
          },
          Function: "Use a specific function type instead, like `() => void`.",
          null: {
            message: "Use `undefined` instead. See: https://github.com/sindresorhus/meta/issues/7",
            fixWith: "undefined",
          },
          "[]": "Don't use the empty array type `[]`. It only allows empty arrays. Use `SomeType[]` instead.",
          "[[]]": "Don't use `[[]]`. It only allows an array with a single element which is an empty array. Use `SomeType[][]` instead.",
          "[[[]]]": "Don't use `[[[]]]`. Use `SomeType[][][]` instead.",
          "[[[[]]]]": "ur drunk 🤡",
          "[[[[[]]]]]": "🦄💥",
        },
      },
    ],
  },
}