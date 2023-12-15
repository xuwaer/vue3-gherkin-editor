import { type Ace } from 'ace-builds';
import type { OnParseCallback } from '../../lib/gherkin-linter';
import type { LanguageIdentifier } from '../../lib/gherkin-languages';
export type AutoCompleteFunc = (...args: any) => Promise<any[]>
export interface GherkinEditorProps {
    modelValue: string;
    language?: LanguageIdentifier;
    readOnly?: boolean;
    uniqueId?: number | string;
    onParse?: OnParseCallback;
    autoCompleteFunction?: AutoCompleteFunc;
    autoFocus?: boolean;
    theme?: 'cucumber' | 'jira';
    mode?: 'gherkin_i18n' | 'gherkin_background_i18n' | 'gherkin_scenario_i18n';
    fontSize?: number;
    showPrintMargin?: boolean;
    showGutter?: boolean;
    highlightActiveLine?: boolean;
    activateLinter?: boolean;
    setOptions?: Partial<Ace.EditorOptions>;
}
declare const _default: import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<GherkinEditorProps>, {
    modelValue: string;
    language: string;
    readOnly: boolean;
    uniqueId: string;
    onParse: () => void;
    autoCompleteFunction: () => Promise<never[]>;
    autoFocus: boolean;
    initialHeight: number;
    theme: string;
    mode: string;
    fontSize: number;
    width: string;
    showPrintMargin: boolean;
    showGutter: boolean;
    highlightActiveLine: boolean;
    activateLinter: boolean;
    setOptions: () => {};
}>, {
    editor: import("vue").ComputedRef<Ace.Editor | null>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: string) => void;
    "update:language": (value: string) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<GherkinEditorProps>, {
    modelValue: string;
    language: string;
    readOnly: boolean;
    uniqueId: string;
    onParse: () => void;
    autoCompleteFunction: () => Promise<never[]>;
    autoFocus: boolean;
    initialHeight: number;
    theme: string;
    mode: string;
    fontSize: number;
    width: string;
    showPrintMargin: boolean;
    showGutter: boolean;
    highlightActiveLine: boolean;
    activateLinter: boolean;
    setOptions: () => {};
}>>> & {
    "onUpdate:modelValue"?: ((value: string) => any) | undefined;
    "onUpdate:language"?: ((value: string) => any) | undefined;
}, {
    width: string;
    fontSize: number;
    modelValue: string;
    language: "en" | "af" | "am" | "an" | "ar" | "ast" | "az" | "be" | "bg" | "bm" | "bs" | "ca" | "cs" | "cy-GB" | "da" | "de" | "el" | "em" | "en-Scouse" | "en-au" | "en-lol" | "en-old" | "en-pirate" | "en-tx" | "eo" | "es" | "et" | "fa" | "fi" | "fr" | "ga" | "gj" | "gl" | "he" | "hi" | "hr" | "ht" | "hu" | "id" | "is" | "it" | "ja" | "jv" | "ka" | "kn" | "ko" | "lt" | "lu" | "lv" | "mk-Cyrl" | "mk-Latn" | "mn" | "ne" | "nl" | "no" | "pa" | "pl" | "pt" | "ro" | "ru" | "sk" | "sl" | "sr-Cyrl" | "sr-Latn" | "sv" | "ta" | "th" | "te" | "tlh" | "tr" | "tt" | "uk" | "ur" | "uz" | "vi" | "zh-CN" | "zh-TW" | "mr" | "amh";
    readOnly: boolean;
    uniqueId: string | number;
    onParse: OnParseCallback;
    autoCompleteFunction: AutoCompleteFunc;
    autoFocus: boolean;
    initialHeight: number;
    theme: string;
    mode: "gherkin_background_i18n" | "gherkin_scenario_i18n" | "gherkin_i18n";
    showPrintMargin: boolean;
    showGutter: boolean;
    highlightActiveLine: boolean;
    activateLinter: boolean;
    setOptions: Partial<Ace.EditorOptions>;
}, {}>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
