/**
 * @author xuwaer
 * @date 2023/12/12
 * @description GherkinLinter 语法检查器
 */
import { generateMessages } from '@cucumber/gherkin'
import * as m from '@cucumber/messages'
import gherkinLanguages, { type LanguageIdentifier, type LanguageSubsetIdentifier } from '../gherkin-languages'

export type OnParseCallback = (messages: Readonly<m.Envelope[]>) => void

export default class GherkinLinter {
  private options: object
  private offset: number
  private isSubset: boolean
  private subsetType: LanguageSubsetIdentifier | ''
  private language: LanguageIdentifier
  private featureKeyword: string
  private lastParsedGherkin: string
  private lintingErrors: object[]

  constructor(private onParse?: OnParseCallback) {
    this.options = {
      includeGherkinDocument: true,
      newId: () => Math.random().toString()
    }

    this.offset = 0
    this.isSubset = false
    this.subsetType = ''

    this.language = 'en'
    this.featureKeyword = 'Feature'

    this.lastParsedGherkin = ''
    this.lintingErrors = []
  }

  setLanguage(language: LanguageIdentifier) {
    language ||= 'en'

    if (this.language === language) {
      return this
    }

    if (!gherkinLanguages[language]) {
      return this
    }

    this.language = language
    this.featureKeyword = gherkinLanguages[this.language].feature[0]

    this.lastParsedGherkin = ''

    return this
  }

  setSubsetType(type: string) {
    if (type === this.subsetType) {
      return this
    }

    if (type === 'scenario' || type === 'background' || type === 'feature') {
      this.subsetType = type
      this.isSubset = true
    } else {
      this.subsetType = ''
      this.isSubset = false
    }

    this.lastParsedGherkin = ''

    return this
  }

  parse(gherkin: string) {
    if (gherkin === this.lastParsedGherkin) {
      return this
    }

    this.parseGherkin(gherkin)
    this.lastParsedGherkin = gherkin

    return this
  }

  getLintingErrors() {
    return this.lintingErrors
  }

  private parseGherkin(gherkin: string) {
    const messages = generateMessages(
      this.getContentToLint(gherkin),
      'feature.feature',
      m.SourceMediaType.TEXT_X_CUCUMBER_GHERKIN_PLAIN,
      { includeSource: !!this.onParse, ...this.options }
    )

    this.lintingErrors = messages
      .filter(message => message.parseError)
      .map(message => ({
        line: (message.parseError?.source.location?.line || 0) - this.offset,
        row: (message.parseError?.source.location?.line || 0) - 1 - this.offset,
        character: message.parseError?.source.location?.column || 0,
        column: (message.parseError?.source.location?.column || 0) - 1,
        text: this.removeLineNumber(message.parseError?.message || ""),
        type: 'warning'
      }))

    this.onParse && this.onParse(messages)
  }

  private getContentToLint(gherkin: string) {
    let featurePrefix = ''

    this.offset = 0

    if (this.language !== 'en') {
      // 非英文需要增加语言标注
      this.offset += 1
      featurePrefix = `# language: ${this.language}\n`
    }

    if (this.isSubset) {
      if (this.subsetType == 'feature') {
        featurePrefix = `${featurePrefix}${this.featureKeyword}:\n`
        this.offset += 1
      } else {
        // 部分录入，需要补全Feature部分
        const subsetKeyword = gherkinLanguages[this.language][this.subsetType as LanguageSubsetIdentifier][0]
        featurePrefix = `${featurePrefix}${this.featureKeyword}:\n${subsetKeyword}:\n`
        this.offset += 2
      }
    }

    return `${featurePrefix}${gherkin}`
  }

  private removeLineNumber(errorMessage: string) {
    return errorMessage.split(' ').slice(1).join(' ')
  }
}
