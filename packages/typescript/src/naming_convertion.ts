import type { Linter } from "eslint"

export function namingConvertion(isTsx: boolean): Linter.RulesRecord {
    return {
        "ts/naming-convention": [
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
                    "objectLiteralProperty",
                ],
                format: null,
                modifiers: [
                    "requiresQuotes",
                ],
            },
        ],
    }
}
