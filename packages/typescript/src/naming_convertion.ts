import type { Linter } from "eslint"

export function namingConvertion(isTsx: boolean): Linter.RulesRecord {
    return {
        "ts/naming-convention": [
            "error",
            {
                // selector: ['variableLike', 'memberLike', 'property', 'method'],
                // Note: Leaving out `parameter` and `typeProperty` because of the mentioned known issues.
                // Ignore `{'Retry-After': retryAfter}` type properties.
                filter: {
                    match: false,
                    regex: "[- ]",
                },
                format: isTsx
                    ? ["camelCase", "StrictPascalCase"]
                    : ["camelCase"],

                // We allow double underscore because of GraphQL type names and some React names.
                leadingUnderscore: "allowSingleOrDouble",

                // Note: We are intentionally leaving out `enumMember` as it's usually pascal-case or upper-snake-case.
                selector: [
                    // disabled for some object's key is a path
                    // "objectLiteralProperty",
                    "parameterProperty",
                    "classMethod",
                    "objectLiteralMethod",
                    "typeMethod",
                    "accessor",
                ],
                trailingUnderscore: "allow",
            },
            {
                // allow decorator to use PascalCase
                format: ["PascalCase", "camelCase"],
                selector: ["function"],
            },
            {
                format: ["camelCase"],
                selector: ["classProperty", "classicAccessor"],
            },
            {
                format: ["UPPER_CASE"],
                modifiers: ["static"],
                selector: ["classProperty", "classicAccessor"],
            },
            {
                format: ["camelCase"],
                leadingUnderscore: "allowSingleOrDouble",
                selector: "variable",
            },
            {
                // storybook use PascalCase define template
                format: ["camelCase", "UPPER_CASE", "PascalCase"],
                leadingUnderscore: "allowSingleOrDouble",
                modifiers: ["const"],
                selector: "variable",
            },
            {
                format: ["PascalCase"],
                selector: ["typeLike"],
            },
            {
                filter: /^(?!I)[A-Z]/.source,
                format: [
                    "PascalCase",
                ],

                // Interface name should not be prefixed with `I`.
                selector: "interface",
            },
            {
                filter: /^T$|^R$|^[A-Z][A-Za-z]+$/.source,
                format: [
                    "PascalCase",
                ],

                // Type parameter name should either be `T` or a descriptive name.
                selector: "typeParameter",
            },

            // Allow these in non-camel-case when quoted.
            {
                format: null,
                modifiers: [
                    "requiresQuotes",
                ],
                selector: [
                    "classProperty",
                    "objectLiteralProperty",
                ],
            },
        ],
    }
}
