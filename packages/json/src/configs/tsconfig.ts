import type { EslintFlatConfigItem } from "@rainbowatcher/eslint-config-shared"

export function tsconfig(): EslintFlatConfigItem {
    return {
        files: ["**/tsconfig.json", "**/tsconfig.*.json"],
        name: "rainbowatcher:json:tsconfig.json",
        rules: {
            "jsonc/no-comments": "off",
            "jsonc/sort-keys": [
                "error",
                {
                    order: [
                        "extends",
                        "compilerOptions",
                        "references",
                        "files",
                        "include",
                        "exclude",
                    ],
                    pathPattern: "^$",
                },
                {
                    order: [
                        /* Projects */
                        "incremental",
                        "composite",
                        "tsBuildInfoFile",
                        "disableSourceOfProjectReferenceRedirect",
                        "disableSolutionSearching",
                        "disableReferencedProjectLoad",

                        /* Language and Environment */
                        "target",
                        "jsx",
                        "jsxFactory",
                        "jsxFragmentFactory",
                        "jsxImportSource",
                        "lib",
                        "moduleDetection",
                        "noLib",
                        "reactNamespace",
                        "useDefineForClassFields",
                        "emitDecoratorMetadata",
                        "experimentalDecorators",

                        /* Modules */
                        "baseUrl",
                        "rootDir",
                        "rootDirs",
                        "customConditions",
                        "module",
                        "moduleResolution",
                        "moduleSuffixes",
                        "noResolve",
                        "paths",
                        "resolveJsonModule",
                        "resolvePackageJsonExports",
                        "resolvePackageJsonImports",
                        "typeRoots",
                        "types",
                        "allowArbitraryExtensions",
                        "allowImportingTsExtensions",
                        "allowUmdGlobalAccess",

                        /* JavaScript Support */
                        "allowJs",
                        "checkJs",
                        "maxNodeModuleJsDepth",

                        /* Type Checking */
                        "strict",
                        "strictBindCallApply",
                        "strictFunctionTypes",
                        "strictNullChecks",
                        "strictPropertyInitialization",
                        "allowUnreachableCode",
                        "allowUnusedLabels",
                        "alwaysStrict",
                        "exactOptionalPropertyTypes",
                        "noFallthroughCasesInSwitch",
                        "noImplicitAny",
                        "noImplicitOverride",
                        "noImplicitReturns",
                        "noImplicitThis",
                        "noPropertyAccessFromIndexSignature",
                        "noUncheckedIndexedAccess",
                        "noUnusedLocals",
                        "noUnusedParameters",
                        "useUnknownInCatchVariables",

                        /* Emit */
                        "declaration",
                        "declarationDir",
                        "declarationMap",
                        "downlevelIteration",
                        "emitBOM",
                        "emitDeclarationOnly",
                        "importHelpers",
                        "importsNotUsedAsValues",
                        "inlineSourceMap",
                        "inlineSources",
                        "mapRoot",
                        "newLine",
                        "noEmit",
                        "noEmitHelpers",
                        "noEmitOnError",
                        "outDir",
                        "outFile",
                        "preserveConstEnums",
                        "preserveValueImports",
                        "removeComments",
                        "sourceMap",
                        "sourceRoot",
                        "stripInternal",

                        /* Interop Constraints */
                        "allowSyntheticDefaultImports",
                        "esModuleInterop",
                        "forceConsistentCasingInFileNames",
                        "isolatedModules",
                        "preserveSymlinks",
                        "verbatimModuleSyntax",

                        /* Completeness */
                        "skipDefaultLibCheck",
                        "skipLibCheck",
                    ],
                    pathPattern: "^compilerOptions$",
                },
            ],
        },
    }
}
