const { defineConfig } = require("eslint-define-config")

module.exports = defineConfig({
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
  ],
  plugins: [
    "import",
    "antfu",
  ],
  ignorePatterns: [
    "*.min.*",
    "*.d.ts",
    "CHANGELOG.md",
    "dist",
    "LICENSE*",
    "output",
    "out",
    "coverage",
    "public",
    "temp",
    "package-lock.json",
    "pnpm-lock.yaml",
    "yarn.lock",
    "__snapshots__",
    // ignore for in lint-staged
    "*.css",
    "*.png",
    "*.ico",
    "*.toml",
    "*.patch",
    "*.txt",
    "*.crt",
    "*.key",
    "Dockerfile",
    // force include
    "!.github",
    "!.vitepress",
    "!.vscode",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    allowImportExportEverywhere: false,
  },
  rules: {
    // antfu
    "antfu/import-dedupe": "error",
    "antfu/top-level-function": "error",
    // # 1. Types
    "no-constant-binary-expression": "error",
    // # 2. References
    // # 3. Objects
    "object-shorthand": "error",
    "quote-props": ["error", "as-needed"],
    "object-curly-newline": ["error", { consistent: true, multiline: true }],
    "object-property-newline": ["error", { allowMultiplePropertiesPerLine: true }],
    // # 4. Arrays
    "no-array-constructor": "error",
    "array-callback-return": ["error", { checkForEach: true }],
    "array-element-newline": ["error", "consistent"],
    // # 5. Destructuring
    // ref xo, TODO: may change when eslint issue fixed.
    "prefer-destructuring": ["error", {
      VariableDeclarator: {
        array: false,
        object: true,
      },
      AssignmentExpression: {
        array: false,
        // Disabled because object assignment destructuring requires parens wrapping:
        // `let foo; ({foo} = object);`
        object: false,
      },
    }],
    // # 6. Strings
    quotes: ["error", "double", { avoidEscape: true }],
    "template-curly-spacing": "error",
    "prefer-template": "error",
    "no-useless-escape": "error",
    // # 7. Functions
    "wrap-iife": [
      "error",
      "inside",
      {
        functionPrototypeMethods: true,
      },
    ],
    "prefer-rest-params": "error",
    "default-param-last": "error",
    "space-before-function-paren": ["error", { anonymous: "always", named: "never", asyncArrow: "always" }],
    "space-before-blocks": ["error", "always"],
    "no-new-func": "error",
    "no-loop-func": "error",
    "no-empty-function": "warn",
    // # 8. Arrow Functions
    "arrow-spacing": ["error", { before: true, after: true }],
    // "arrow-body-style": ["error", "as-needed"],
    "arrow-parens": ["error", "as-needed", { requireForBlockBody: true }],
    // # 9. Classes & Constructors
    "no-constructor-return": "error",
    "lines-between-class-members": ["error", "always", { exceptAfterSingleLine: true }],
    // # 10. Modules
    // disabled because it not compatible with virtual module in vite
    "no-undef": "off",
    "import/export": "error",
    "import/no-duplicates": "error",
    "import/newline-after-import": "error",
    "import/no-named-as-default-member": "error",
    "import/order": "error",
    "import/first": "error",
    "import/no-mutable-exports": "error",
    "no-duplicate-imports": ["error", { includeExports: true }],
    "sort-imports": [
      "error",
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
        allowSeparatedGroups: false,
      },
    ],
    // # 11. Iterators and Generators
    "no-await-in-loop": "error",
    // # 12. Properties
    // # 13. Variables
    "prefer-const": [
      "error",
      {
        destructuring: "all",
        ignoreReadBeforeAssign: true,
      },
    ],
    // # 14. Hoisting
    // # 15. Comparison Operators & Equality
    "no-unneeded-ternary": "error",
    // # 16. Blocks
    "block-spacing": ["error", "always"],
    "brace-style": ["error", "1tbs", { allowSingleLine: true }],
    // # 17. Control Statements
    // # 18. Comments
    "spaced-comment": ["error", "always", {
      line: {
        markers: ["/"],
        exceptions: ["/", "#"],
      },
      block: {
        markers: ["!"],
        exceptions: ["*"],
        balanced: true,
      },
    }],
    // # 19. Whitespace
    indent: ["error", 2, { SwitchCase: 1, VariableDeclarator: 1, outerIIFEBody: 1 }],
    "array-bracket-spacing": ["error", "never"],
    "no-mixed-spaces-and-tabs": "error",
    "no-trailing-spaces": "error",
    "no-multi-spaces": "error",
    "comma-spacing": ["error", { before: false, after: true }],
    "linebreak-style": [
      process.platform === "win32" ? "off" : "error",
      "unix",
    ],
    "keyword-spacing": "error",
    "key-spacing": ["error", { beforeColon: false, afterColon: true }],
    "space-infix-ops": "error",
    "space-in-parens": ["error", "never"],
    // # 20. Commas
    "comma-dangle": ["error", "always-multiline"],
    // # 21. Semicolons
    semi: ["error", "never"],
    "array-bracket-newline": [
      "error",
      "consistent",
    ],
    "object-curly-spacing": ["error", "always"],
    "newline-per-chained-call": ["error", { ignoreChainWithDepth: 3 }],
    // # 22. Type Casting & Coercion
    // # 23. Naming Conventions
    // # 24. Accessors
    // # 25. Events
    // # 26. jQuery
    // # 27. ECMAScript 5 Compatibility
    // # 28. ECMAScript 6+ (ES 2015+) Styles
    // # 29. Standard Library
    "no-restricted-globals": [
      "error",
      "event",
    ],
    // # 30. Testing
    // # 31. Performance
    // # 31. Others
  },
})