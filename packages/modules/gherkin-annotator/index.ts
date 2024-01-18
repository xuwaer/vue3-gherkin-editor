import debounce from 'lodash/debounce'
import GherkinLinter, { type OnParseCallback } from '../../lib/gherkin-linter'
import type { LanguageIdentifier } from '../../lib/gherkin-languages'
import type { Ace } from 'ace-builds'

type OnErrorCallback = (errors: Ace.Annotation[]) => Ace.Annotation[]

export default class GherkinAnnotator {
  private linter: GherkinLinter
  public language: LanguageIdentifier = 'en'
  public mode: '' | 'scenario' | 'background' | 'feature' = ''

  constructor(public session: Ace.EditSession, private options?: Partial<{ onParse: OnParseCallback, formatErrors: OnErrorCallback }>) {
    const { onParse } = options || {}
    this.linter = new GherkinLinter(onParse)
  }

  setSession(session: Ace.EditSession) {
    this.session = session
  }

  setLanguage(language: LanguageIdentifier) {
    this.language = language
  }

  setMode(mode: 'gherkin_background_i18n' | 'gherkin_scenario_i18n' | 'gherkin_feature_i18n' | 'gherkin_i18n') {
    switch (mode) {
      case 'gherkin_background_i18n':
        this.mode = 'background'
        break
      case 'gherkin_scenario_i18n':
        this.mode = 'scenario'
        break
      case 'gherkin_feature_i18n':
        this.mode = 'feature'
        break
      default:
        this.mode = ''
    }
  }

  annotate(value: string) {
    this.debouncedAnnotate(value)
  }

  debouncedAnnotate = debounce(value => {
    this.annotateNow(value)
  }, 250)

  async annotateNow(value: string) {
    const errors = await this.lint(value)

    if (!Array.isArray(errors)) {
      return
    }

    if (errors.length > 0) {
      const ann = this.options?.formatErrors?.(errors as any[]) ?? errors
      this.session.setAnnotations(ann as any[])
    } else {
      this.session.clearAnnotations()
    }
  }

  async lint(value: string) {
    return this.linter
      .setLanguage(this.language)
      .setSubsetType(this.mode)
      .parse(value)
      .getLintingErrors()
  }
}
