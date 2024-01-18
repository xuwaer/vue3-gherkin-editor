<script setup lang="ts">
import { computed, ref } from 'vue'
import { VAceEditor } from 'vue3-ace-editor'
import './ace-config'
// import GherkinEditor from '../dist/vue3-gherkin-editor'
import GherkinEditor from '../packages'
import example1 from './assets/example1.txt?raw'
import example2 from './assets/example2.txt?raw'
import type { Ace } from 'ace-builds'

const content = ref(example2)
const aceRef = ref()

const editor = computed(() => aceRef.value?.editor)

const parsedJson = ref('')

function onParse(val: any) {
  console.log('parse', val)
  parsedJson.value = JSON.stringify(val, null, 2)
}

function formatErrors(errors: Ace.Annotation[]) {
  const errorFilter = (text: string) => {
    return text.replace('#EOF, ', '').replace('#Empty, ', '')
  }

  console.log('Annotations', errors)
  return errors.map((val) => Object.assign({}, val, { text: errorFilter(val.text) }))
}
</script>

<template>
  <main>
    <GherkinEditor
      class="vue-ace-editor"
      ref="aceRef"
      v-model="content"
      show-gutter
      activate-linter
      mode="gherkin_feature_i18n"
      :on-parse="onParse"
      :format-errors="formatErrors"
      :set-options="{ showLineNumbers: true, showFoldWidgets: false, showPrintMargin: false }"
    />
    <VAceEditor
      v-model:value="parsedJson"
      class="outline-tree"
      lang="json"
      theme="chrome"
      readonly
      :options="{
        useWorker: true,
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
        showLineNumbers: false,
        displayIndentGuides: false,
        tabSize: 2,
        fontSize: 16
      }"
    />
  </main>
</template>

<style scoped>
main {
  padding: 20px;
  flex: 1;
  display: flex;
  height: 100vh;
}

.vue-ace-editor {
  font-size: 16px;
  border: 1px solid;
  flex: 1;
}

.outline-tree {
  flex: 1;
  margin-left: 15px;
  border: 1px solid;
  font-size: 16px;
}
</style>
