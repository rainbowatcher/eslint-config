const fs = require("node:fs")
const path = require("node:path")
const { defineConfig } = require("eslint-define-config")

const tsconfig = process.env.ESLINT_TSCONFIG || "tsconfig.json"

// eslint-disable-next-line no-unused-vars
function getNamingConventionRule({ isTsx }) {
  return {
    "@typescript-eslint/naming-convention": [
      "error",
      {
        /// selector: ['variableLike', 'memberLike', 'property', 'method'],
        // Note: Leaving out `parameter` and `typeProperty` because of the mentioned known issues.
        // Note: We are intentionally leaving out `enumMember` as it's usually pascal-case or upper-snake-case.
        selector: [
          "function",
          "classProperty",
          // disabled for some object's key is a path
          // "objectLiteralProperty",
          "parameterProperty",
          "classMethod",
          "objectLiteralMethod",
          "typeMethod",
          "accessor",
        ],
        format: [
          "camelCase",
          isTsx && "StrictPascalCase",
        ].filter(Boolean),
        // We allow double underscore because of GraphQL type names and some React names.
        leadingUnderscore: "allowSingleOrDouble",
        trailingUnderscore: "allow",
        // Ignore `{'Retry-After': retryAfter}` type properties.
        filter: {
          regex: "[- ]",
          match: false,
        },
      },
      {
        selector: "variable",
        format: ["camelCase"],
      },
      {
        selector: "variable",
        modifiers: ["const"],
        // storybook use PascalCase define template
        format: ["camelCase", "UPPER_CASE", "PascalCase"],
      },
      {
        selector: "typeLike",
        format: [
          "PascalCase",
        ],
      },
      {
        selector: "variable",
        types: [
          "boolean",
        ],
        format: [
          "PascalCase",
        ],
        prefix: [
          "is",
          "has",
          "can",
          "should",
          "will",
          "did",
          "show",
          "hide",
        ],
      },
      {
        // Interface name should not be prefixed with `I`.
        selector: "interface",
        filter: /^(?!I)[A-Z]/.source,
        format: [
          "PascalCase",
        ],
      },
      {
        // Type parameter name should either be `T` or a descriptive name.
        selector: "typeParameter",
        filter: /^T$|^[A-Z][a-zA-Z]+$/.source,
        format: [
          "PascalCase",
        ],
      },
      // Allow these in non-camel-case when quoted.
      {
        selector: [
          "classProperty",
        ],
        format: null,
        modifiers: [
          "requiresQuotes",
        ],
      },
    ],
  }
}

module.exports = defineConfig({
  extends: ["@rainbowatcher/eslint-config-js"],
  plugins: [
    "import",
    "antfu",
  ],
  rules: {
    // antfu
    "antfu/top-level-function": "error",
    "antfu/generic-spacing": "error",
  },
  overrides: !fs.existsSync(path.join(process.cwd(), tsconfig)) ? [] : [{
    extends: [
      "plugin:import/recommended",
      "plugin:import/typescript",
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
    parser: "@typescript-eslint/parser",
    parserOptions: {
      tsconfigRootDir: process.cwd(),
      project: [tsconfig],
      warnOnUnsupportedTypeScriptVersion: false,
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },
    plugins: [
      "@typescript-eslint",
    ],
    excludedFiles: ["**/*.md/*.*"],
    files: ["*.ts", "*.tsx", "*.mts", "*.cts"],
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended-requiring-type-checking.ts
    rules: {
      "@typescript-eslint/adjacent-overload-signatures": "error",
      "@typescript-eslint/array-type": ["error", { default: "array-simple" }],
      "@typescript-eslint/ban-ts-comment": ["error", { "ts-expect-error": "allow-with-description", minimumDescriptionLength: 4 }],
      "@typescript-eslint/ban-tslint-comment": "error",
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
      "@typescript-eslint/class-literal-property-style": ["error", "fields"],
      "@typescript-eslint/consistent-generic-constructors": ["error", "constructor"],
      "@typescript-eslint/consistent-indexed-object-style": "error",
      "@typescript-eslint/default-param-last": "error",
      "@typescript-eslint/consistent-type-assertions": ["error", { assertionStyle: "as", objectLiteralTypeAssertions: "allow-as-parameter" }],
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports", disallowTypeAnnotations: false }],
      "@typescript-eslint/member-delimiter-style": ["error", { multiline: { delimiter: "none" } }],
      "@typescript-eslint/member-ordering": [
        "error",
        {
          default: [
            "signature",

            "public-static-field",
            "public-static-method",

            "protected-static-field",
            "protected-static-method",

            "private-static-field",
            "private-static-method",

            "static-field",
            "static-method",

            "public-decorated-field",
            "public-instance-field",
            "public-abstract-field",
            "public-field",

            "protected-decorated-field",
            "protected-instance-field",
            "protected-abstract-field",
            "protected-field",

            "private-decorated-field",
            "private-instance-field",
            "private-field",

            "instance-field",
            "abstract-field",
            "decorated-field",
            "field",

            "public-constructor",
            "protected-constructor",
            "private-constructor",
            "constructor",

            "public-decorated-method",
            "public-instance-method",
            "public-abstract-method",
            "public-method",

            "protected-decorated-method",
            "protected-instance-method",
            "protected-abstract-method",
            "protected-method",

            "private-decorated-method",
            "private-instance-method",
            "private-method",

            "instance-method",
            "abstract-method",
            "decorated-method",
            "method",
          ],
        },
      ],
      "@typescript-eslint/no-duplicate-enum-values": "error",
      "@typescript-eslint/no-dynamic-delete": "error",
      "@typescript-eslint/no-extraneous-class": [
        "error",
        {
          allowConstructorOnly: false,
          allowEmpty: false,
          allowStaticOnly: false,
          allowWithDecorator: true,
        },
      ],
      // To allow `ignoreVoid` in `@typescript-eslint/no-floating-promises`
      "no-void": ["error", { allowAsStatement: true }],
      "@typescript-eslint/no-for-in-array": "error",
      "@typescript-eslint/no-inferrable-types": "error",
      "@typescript-eslint/no-misused-new": "error",
      "@typescript-eslint/no-namespace": "error",
      "@typescript-eslint/no-non-null-asserted-nullish-coalescing": "error",
      "@typescript-eslint/no-non-null-asserted-optional-chain": "error",
      // "@typescript-eslint/no-require-imports": "error",
      "@typescript-eslint/no-this-alias": [
        "error",
        {
          allowDestructuring: true,
        },
      ],
      // This rule may cause eslint to mischeck
      // "@typescript-eslint/no-explicit-any": "error",

      // Off
      "brace-style": "off",
      "@typescript-eslint/brace-style": ["error", "stroustrup", { allowSingleLine: true }],
      "comma-dangle": "off",
      "@typescript-eslint/comma-dangle": ["error", "always-multiline"],
      "comma-spacing": "off",
      "@typescript-eslint/comma-spacing": ["error", { before: false, after: true }],
      "default-param-last": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "import/no-unresolved": "off",
      "import/named": "off",
      "no-duplicate-imports": "off",
      "no-empty-function": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-empty-interface": ["error", { allowSingleExtends: true }],
      "space-infix-ops": "off",
      "@typescript-eslint/space-infix-ops": "error",
      "keyword-spacing": "off",
      "@typescript-eslint/keyword-spacing": "error",
      "func-call-spacing": "off",
      "@typescript-eslint/func-call-spacing": ["error", "never"],
      indent: "off",
      "@typescript-eslint/indent": ["error", 2, { SwitchCase: 1, VariableDeclarator: 1, outerIIFEBody: 1 }],
      "lines-between-class-members": "off",
      "@typescript-eslint/lines-between-class-members": [
        "error",
        "always",
        {
          // Workaround to allow class fields to not have lines between them.
          // refer: XO - TODO: Get ESLint to add an option to ignore class fields.
          exceptAfterSingleLine: true,
        },
      ],
      "no-array-constructor": "off",
      "@typescript-eslint/no-array-constructor": "error",
      "no-dupe-class-members": "off",
      "@typescript-eslint/no-dupe-class-members": "error",
      "no-loss-of-precision": "off",
      "@typescript-eslint/no-loss-of-precision": "error",
      "no-extra-parens": "off",
      "@typescript-eslint/no-extra-parens": ["error", "functions"],
      "no-extra-semi": "off",
      "@typescript-eslint/no-extra-semi": "error",
      "no-loop-func": "off",
      "@typescript-eslint/no-loop-func": "error",
      "no-redeclare": "off",
      "@typescript-eslint/no-redeclare": "error",
      "no-restricted-imports": "off",
      "@typescript-eslint/no-restricted-imports": [
        "error",
        {
          paths: [
            "error",
            "domain",
            "freelist",
            "smalloc",
            "punycode",
            "sys",
            "querystring",
            "colors",
          ],
        },
      ],

      // === extra
      // "@typescript-eslint/no-empty-function": "warn",
      "@typescript-eslint/no-var-requires": "error",
      // "no-throw-literal": "off",
      // "@typescript-eslint/no-throw-literal": "error",
      "no-implied-eval": "off",
      "@typescript-eslint/no-implied-eval": "error",
      "dot-notation": "off",
      "@typescript-eslint/dot-notation": ["error", { allowKeywords: true }],
      "@typescript-eslint/no-floating-promises": "error",
      // "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/await-thenable": "error",
      // "@typescript-eslint/no-for-in-array": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      /* Will cause incorrect type judgment.
      "@typescript-eslint/no-unsafe-call": "error",
      "@typescript-eslint/no-unsafe-argument": "error",
      "@typescript-eslint/no-unsafe-assignment": "error",
      "@typescript-eslint/no-unsafe-member-access": "error",
      "@typescript-eslint/no-unsafe-return": "error",
      */
      "require-await": "off",
      "@typescript-eslint/require-await": "error",
      "@typescript-eslint/restrict-plus-operands": "error",
      "@typescript-eslint/restrict-template-expressions": "error",
      "@typescript-eslint/unbound-method": "error",

      "@typescript-eslint/no-redundant-type-constituents": "error",
      "@typescript-eslint/no-meaningless-void-operator": "error",
      "@typescript-eslint/no-base-to-string": "error",
      "@typescript-eslint/no-confusing-void-expression": "error",
      "@typescript-eslint/consistent-type-exports": ["error", { fixMixedExportsWithInlineTypeSpecifier: true }],
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksConditionals: true,
          // TODO: I really want this to be `true`, but it makes it inconvenient to use
          // async functions as event handlers... I need to find a good way to handle that.
          // https://github.com/sindresorhus/refined-github/pull/2391#discussion_r318990466
          checksVoidReturn: false,
        },
      ],
      "no-throw-literal": "off",
      "@typescript-eslint/no-throw-literal": [
        "error",
        {
          // This should ideally be `false`, but it makes rethrowing errors inconvenient. There should be a separate `allowRethrowingUnknown` option.
          allowThrowingUnknown: true,
          allowThrowingAny: false,
        },
      ],
      camelcase: "off",
      "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
      "@typescript-eslint/type-annotation-spacing": "error",
      // ...getNamingConventionRule({ isTsx: false }),
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
})
