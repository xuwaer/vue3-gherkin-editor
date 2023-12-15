<script setup lang="ts">
import { ref } from 'vue'
import { VAceEditor } from 'vue3-ace-editor'
import './ace-config'
import GherkinEditor from '../dist/vue3-gherkin-editor'
import data from './gherkin.txt?raw'

const content = ref(data)
const aceRef = ref()

const parsedJson = ref('')

function onParse(val: any) {
  console.log('parse', val)
  parsedJson.value = JSON.stringify(val, null, 2)
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
      :on-parse="onParse"
      :set-options="{ showLineNumbers: true, showFoldWidgets: true }"
    />
    <VAceEditor
      v-model:value="parsedJson"
      class="outline-tree"
      lang="json"
      theme="xcode"
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
  margin-top: 15px;
  display: flex;
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
