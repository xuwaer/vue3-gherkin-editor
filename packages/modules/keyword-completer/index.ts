import type { Ace } from "ace-builds"
import type { GetGherkinDialectFunc } from "../../types"

class KeywordCompleter {

  private getGherkinDialect: GetGherkinDialectFunc

  constructor(getGherkinDialect: GetGherkinDialectFunc) {
    this.getGherkinDialect = getGherkinDialect
  }

  getCompletions = async (_editor: Ace.Editor, session: Ace.EditSession, position: any, _prefix: any, callback: any) => {
    const lineTokens = session.getLine(position.row).trim().split(' ')

    if (lineTokens.length === 1) {
      const keywords = [
        ...this.getGherkinDialect().labels || [],
        ...this.getGherkinDialect().keywords || []
      ]
      const completions = keywords.map((keyword, index) => ({
        caption: keyword,
        value: keyword,
        score: index,
        meta: 'Keyword'
      }))

      callback(null, completions)
    }
  }
}

export default KeywordCompleter
