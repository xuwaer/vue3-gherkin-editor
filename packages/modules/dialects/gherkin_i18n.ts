/**
 * @author xuwaer
 * @date 2023/12/13
 * @description gherkin_i18n 翻译器
 */
import type { GherkinDialectItem } from '../../types'
import gherkinLanguages, { type LanguageIdentifier } from '../../lib/gherkin-languages'

let GherkinDialect: Partial<GherkinDialectItem> = {}

export const setGherkinDialect = (language: LanguageIdentifier) => {
  const dialect = gherkinLanguages[language]
  const trimWhiteSpace = (str: string) => str.trim()
  GherkinDialect = {
    name: dialect.name,
    native_name: dialect.native,
    labels: [
      ...new Set([
        ...dialect.feature.map(trimWhiteSpace),
        ...dialect.background.map(trimWhiteSpace),
        ...dialect.scenario.map(trimWhiteSpace),
        ...dialect.scenarioOutline.map(trimWhiteSpace),
        ...dialect.examples.map(trimWhiteSpace),
        ...dialect.rule.map(trimWhiteSpace),
      ])
    ],
    keywords: [
      ...new Set([
        ...dialect.given.map(trimWhiteSpace),
        ...dialect.when.map(trimWhiteSpace),
        ...dialect.then.map(trimWhiteSpace),
        ...dialect.and.map(trimWhiteSpace),
        ...dialect.but.map(trimWhiteSpace)
      ])
    ]
  }
}

setGherkinDialect('en')

export const getGherkinDialect = () => GherkinDialect
