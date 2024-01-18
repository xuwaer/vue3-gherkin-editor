<template>
  <VAceEditor
    ref="aceEditorRef"
    v-model:value="content"
    :theme="theme"
    :name="uniqueId"
    :options="options"
    @init="ready = true"
  />
</template>

<script setup lang="ts">
import { computed, ref, toRefs, watchEffect } from 'vue'
import { VAceEditor } from 'vue3-ace-editor'
import type { VAceEditorInstance } from 'vue3-ace-editor/types'
import { require as acequire, type Ace } from 'ace-builds'
import KeywordCompleter from '../../modules/keyword-completer'
import StepCompleter from '../../modules/step-completer'
import {
  setGherkinDialect as setDialect,
  getGherkinDialect as getDialect
} from '../../modules/dialects/gherkin_i18n'
import {
  setGherkinDialect as setBackgroundDialect,
  getGherkinDialect as getBackgroundDialect
} from '../../modules/dialects/gherkin_background_i18n'
import {
  setGherkinDialect as setFeatureDialect,
  getGherkinDialect as getFeatureDialect
} from '../../modules/dialects/gherkin_feature_i18n'
import {
  setGherkinDialect as setScenarioDialect,
  getGherkinDialect as getScenarioDialect
} from '../../modules/dialects/gherkin_scenario_i18n'
import GherkinAnnotator from '../../modules/gherkin-annotator'

import 'ace-builds/src-noconflict/ext-language_tools'

import '../../themes/jira'
import '../../themes/cucumber'

import '../../modules/mode/gherkin_i18n'
import '../../modules/mode/gherkin_background_i18n'
import '../../modules/mode/gherkin_scenario_i18n'
import '../../modules/mode/gherkin_feature_i18n'
import type { OnParseCallback } from '../../lib/gherkin-linter'
import type { LanguageIdentifier } from '../../lib/gherkin-languages'
import type { AutoCompleteFunc } from '../../types'

const setGherkinDialectFunctions = {
  gherkin_i18n: setDialect,
  gherkin_background_i18n: setBackgroundDialect,
  gherkin_scenario_i18n: setScenarioDialect,
  gherkin_feature_i18n: setFeatureDialect
}

const getGherkinDialectFunctions = {
  gherkin_i18n: getDialect,
  gherkin_background_i18n: getBackgroundDialect,
  gherkin_scenario_i18n: getScenarioDialect,
  gherkin_feature_i18n: getFeatureDialect
}

const defaultOptions = {
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  showLineNumbers: false,
  displayIndentGuides: false,
  tabSize: 2
}

export interface GherkinEditorProps {
  modelValue: string
  language?: LanguageIdentifier
  readOnly?: boolean
  uniqueId?: number | string
  onParse?: OnParseCallback
  autoCompleteFunction?: AutoCompleteFunc
  autoFocus?: boolean
  theme?: 'cucumber' | 'jira'
  mode?:
    | 'gherkin_i18n'
    | 'gherkin_background_i18n'
    | 'gherkin_scenario_i18n'
    | 'gherkin_feature_i18n'
  fontSize?: number
  showPrintMargin?: boolean
  showGutter?: boolean
  highlightActiveLine?: boolean
  activateLinter?: boolean
  setOptions?: Partial<Ace.EditorOptions>
  formatErrors?: (errors: Ace.Annotation[]) => Ace.Annotation[]
}

const props = withDefaults(defineProps<GherkinEditorProps>(), {
  modelValue: '',
  language: 'en',
  readOnly: false,
  uniqueId: Math.random().toString(36).substr(2, 9),
  onParse: () => {},
  autoCompleteFunction: () => Promise.resolve([]),
  autoFocus: false,
  theme: 'cucumber',
  mode: 'gherkin_i18n',
  fontSize: 14,
  showPrintMargin: false,
  showGutter: false,
  highlightActiveLine: false,
  activateLinter: false,
  setOptions: () => ({}),
  formatErrors: (errors: Ace.Annotation[]) => errors
})

const {
  activateLinter,
  autoCompleteFunction,
  autoFocus,
  modelValue,
  language,
  mode,
  onParse,
  formatErrors,
  setOptions,
  showGutter,
  theme,
  uniqueId
} = toRefs(props)

const setGherkinDialect = computed(() => setGherkinDialectFunctions[mode.value] || setDialect)
const getGherkinDialect = computed(() => getGherkinDialectFunctions[mode.value] || getDialect)
const isLinterActivated = computed(() => activateLinter.value && showGutter.value)

const aceEditorRef = ref<VAceEditorInstance>()
const ready = ref(false)
const editor = computed(() => (ready.value ? aceEditorRef.value!._editor : null))
const gherkinAnnotator = ref<GherkinAnnotator | null>(null)

watchEffect(() => {
  autoFocus.value && editor.value?.focus()
})

watchEffect(() => {
  // 设置提示菜单
  const keywordCompleter = new KeywordCompleter(getGherkinDialect.value)
  const stepCompleter = new StepCompleter(autoCompleteFunction.value, getGherkinDialect.value)
  // 启用提示菜单
  const langTools = acequire('ace/ext/language_tools')
  langTools.setCompleters([keywordCompleter, stepCompleter])
})

// 设置自定义语言
const currentLanguage = computed<LanguageIdentifier>({
  get() {
    return language.value
  },
  set(v: string) {
    emits('update:language', v)
  }
})

watchEffect(() => {
  // 设置dialect模式
  setGherkinDialect.value(currentLanguage.value)
  editor.value?.session.setMode({
    // @ts-ignore
    path: `ace/mode/${mode.value}`,
    v: Date.now()
  })
})

watchEffect(() => {
  // 语法检查
  if (!isLinterActivated.value) {
    gherkinAnnotator.value = null
    return
  }

  if (!editor.value) {
    return
  }

  const session = editor.value?.getSession()

  if (!gherkinAnnotator.value) {
    gherkinAnnotator.value = new GherkinAnnotator(session, {
      onParse: onParse.value,
      formatErrors: formatErrors.value
    })
  } else {
    gherkinAnnotator.value.setSession(session)
  }
})

watchEffect(() => {
  if (gherkinAnnotator.value) {
    // 更新语法解释器
    gherkinAnnotator.value.setLanguage(currentLanguage.value)
    gherkinAnnotator.value.setMode(mode.value)
    gherkinAnnotator.value.annotate(modelValue.value)
  }
})

const content = computed({
  get() {
    return modelValue.value
  },
  set(v: string) {
    emits('update:modelValue', v)
  }
})

const options: Partial<Ace.EditorOptions> = {
  ...defaultOptions,
  readOnly: props.readOnly,
  showGutter: props.showGutter,
  showPrintMargin: props.showPrintMargin,
  highlightActiveLine: props.highlightActiveLine,
  fontSize: props.fontSize,
  ...setOptions.value
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'update:language', value: string): void
}

const emits = defineEmits<Emits>()

defineExpose({
  editor
})
</script>

<style scoped></style>
