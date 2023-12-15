import * as m from '@cucumber/messages';
import { type LanguageIdentifier } from '../gherkin-languages';
export type OnParseCallback = (messages: Readonly<m.Envelope[]>) => void;
export default class GherkinLinter {
    private onParse?;
    private options;
    private offset;
    private isSubset;
    private subsetType;
    private language;
    private featureKeyword;
    private lastParsedGherkin;
    private lintingErrors;
    constructor(onParse?: OnParseCallback | undefined);
    setLanguage(language: LanguageIdentifier): this;
    setSubsetType(type: string): this;
    parse(gherkin: string): this;
    getLintingErrors(): object[];
    private parseGherkin;
    private getContentToLint;
    private removeLineNumber;
}
