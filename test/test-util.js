const path = require("node:path")
const { ESLint } = require("eslint")
const test = require("ava")

const hasRule = (errors, ruleId) => errors.some(error => error.ruleId === ruleId)

async function runEslint(string, package) {
  const packageName = path.join(process.cwd(), `packages/${package}`)
  const eslint = new ESLint({ useEslintrc: false, overrideConfig: require(packageName) })
  const [firstResult] = await eslint.lintText(string)
  return firstResult.messages
}

module.exports = function (package) {
  return function (rule, input, expect = true) {
    test(`[${rule}] >>> ${input} - ${expect}`, async (t) => {
      const errors = await runEslint(input, package)
      const has = hasRule(errors, rule)
      const msg = JSON.stringify(errors, null, 2)
      expect ? t.true(has, msg) : t.false(has, msg)
    })
  }
}