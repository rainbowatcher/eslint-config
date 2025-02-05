import { rules } from "@typescript-eslint/eslint-plugin"
import { Window } from "happy-dom"

async function getRulesFromWeb() {
    const window = new Window()
    const { document } = window

    window.document.body.innerHTML = await fetch("https://typescript-eslint.io/rules/?=typeInformation").then(res => res.text())
    const typeRulesRows = document.querySelectorAll("table > tbody > tr")
    console.log("Type aware rules: ")
    const typeAwareRules = []
    const otherRules = []
    for (const r of typeRulesRows) {
        const ruleName = r.querySelector("td:nth-child(1) > a > code")?.textContent?.split("/", 2)[1]
        const isTypeAware = r.querySelector("td:nth-child(4)")?.textContent?.trim()
        if (isTypeAware) {
            typeAwareRules.push(`"ts/${ruleName}"`)
        } else {
            otherRules.push(`"ts/${ruleName}"`)
        }
    }

    return {
        otherRules,
        typeAwareRules,
    }
}

function getRulesFromLib() {
    const typeAwareRules = []
    const otherRules = []
    for (const [key, value] of Object.entries(rules)) {
        const ruleName = `ts/${key}`
        if (value.meta.docs.requiresTypeChecking) {
            typeAwareRules.push(ruleName)
        } else {
            otherRules.push(ruleName)
        }
    }
    return {
        otherRules,
        typeAwareRules,
    }
}

const { otherRules, typeAwareRules } = getRulesFromLib()
console.log(typeAwareRules, otherRules)

export { getRulesFromLib, getRulesFromWeb }
