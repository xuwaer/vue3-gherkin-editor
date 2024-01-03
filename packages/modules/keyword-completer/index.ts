/**
 * @author xukj
 * @date 2024/01/03
 * @description index 关键字提示器
 */
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

      const keywords = (this.getGherkinDialect().labels || []).map((key, index) => ({
        caption: key,
        value: key,
        score: index,
        meta: 'Keyword'
      }))

      const steps = (this.getGherkinDialect().keywords || []).map((key, index) => ({
        caption: key,
        value: key,
        score: index,
        meta: 'Step'
      }))
      
      const completions = [...keywords, ...steps]

      callback(null, completions)
    }
  }
}

export default KeywordCompleter
