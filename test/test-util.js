const path = require("node:path")
const { ESLint } = require("eslint")
const test = require("ava")

function hasRule(errors, ruleId) {
  return errors.some(error => error.ruleId === ruleId)
}

async function runEslint(string, eslintConfig, filePath) {
  const eslint = new ESLint({ useEslintrc: false, overrideConfig: eslintConfig })
  const [firstResult] = await eslint.lintText(string, { filePath })
  return firstResult.messages
}

module.exports = function (pkg) {
  const packageName = path.join(process.cwd(), `packages/${pkg}`)
  const eslintConfig = require(packageName)
  let filePath = undefined
  if (pkg === "typescript") {
    filePath = "test/_.ts"
  }
  return function (rule, input, expect = true) {
    test(`[${rule}] >>> ${input} - ${expect}`, async (t) => {
      const errors = await runEslint(input, eslintConfig, filePath)
      const has = hasRule(errors, rule)
      const msg = JSON.stringify(errors, null, 2)
      expect ? t.true(has, msg) : t.false(has, msg)
    })
  }
}