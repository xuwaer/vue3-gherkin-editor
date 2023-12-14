import type { GherkinDialectItem } from '../../types'
import gherkinLanguages, { type LanguageIdentifier } from '../../lib/gherkin-languages'

let GherkinDialect: Partial<GherkinDialectItem> = {}

export const setGherkinDialect = (language: LanguageIdentifier) => {
  const dialect = gherkinLanguages[language]
  const trimWhiteSpace = (str: string) => str.trim()
  GherkinDialect = {
    name: dialect.name,
    native_name: dialect.native,
    labels: [...new Set([...dialect.examples.map(trimWhiteSpace)])],
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
