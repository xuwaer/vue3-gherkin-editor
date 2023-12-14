/**
 * @author xuwaer
 * @date 2023/12/13
 * @description dialect.d
 */
export interface GherkinDialectItem {
    name: string
    native_name: string
    labels: string[]
    keywords: string[]
}

export type GetGherkinDialectFunc = () => Partial<GherkinDialectItem>

export type AutoCompleteFunc = (...args: any) => Promise<any[]>