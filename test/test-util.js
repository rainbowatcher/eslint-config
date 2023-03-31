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
  return function (rule, input) {
    test(`[${rule}] >>> ${input}`, async (t) => {
      const errors = await runEslint(input, package)
      t.true(hasRule(errors, rule), JSON.stringify(errors, null, 2))
    })
  }
}