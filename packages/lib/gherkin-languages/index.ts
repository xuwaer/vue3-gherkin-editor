/**
 * @author xuwaer
 * @date 2023/12/12
 * @description Languages Gherikin语法国际化
 * @see https://github.com/cucumber/gherkin
 */
import Languages from '@cucumber/gherkin/dist/src/gherkin-languages.json'

type LanguagesType = typeof Languages

export type LanguageIdentifier = keyof LanguagesType
export type LanguageSubsetIdentifier = keyof LanguagesType['en']

export default Languages
