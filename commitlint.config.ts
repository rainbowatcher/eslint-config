import type { UserConfig } from "@commitlint/types"

const conf: UserConfig = {
  rules: {
    "scope-enum": [2, "always", ["ci", "build"]],
    "scope-empty": [0, "never"],
    "type-enum": [
      2,
      "always",
      [
        "build",
        "ci",
        "docs",
        "feat",
        "fix",
        "perf",
        "refactor",
        "revert",
        "style",
        "test",
        "chore",
      ],
    ],
  },
}

export default conf
