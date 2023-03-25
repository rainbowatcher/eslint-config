
const tsconfig = process.env.ESLINT_TSCONFIG || "tsconfig.eslint.json"

module.exports = {
  extends: [
    "@rainbowatcher/eslint-config-js",
    "plugin:import/typescript",
    "plugin:import/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
    "import/parsers": {
      [require.resolve("@typescript-eslint/parser")]: [".ts", ".tsx"],
    },
  },
  overrides: [
  ],
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
  ],
  rules: {
    "no-empty-function": "off",
    "@typescript-eslint/no-empty-function": "warn",
    // off
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-types": "off",
    "no-duplicate-imports": "off",
    "@typescript-eslint/no-empty-interface": "off",
  },
}