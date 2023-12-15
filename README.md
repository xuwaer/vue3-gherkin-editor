# vue3-gherkin-editor

gherkin-editor for vue3

#### 1、GherkinEditor

```typescript
import GherkinEditor from '@xuwaer/vue3-gherkin-editor'

<GherkinEditor
  class="full"
  v-model="content"
  showGutter
  activateLinter
  :setOptions="{ showLineNumbers: true }"
/>
```

| Props               | Type               | Default        | Description                                                                             |
| ------------------- | ------------------ | -------------- | --------------------------------------------------------------------------------------- |
| v-model             | `string`           |                | 内容                                                                                    |
| language            | `string`           | `en`           |
| readOnly            | `boolean`          | `false`        |
| onParse             | `function`         |                | 文本解析<br>`activateLinter`为`true`时生效                                                                                |
| autoFocus           | `boolean`          | `false`        |                                                                                         |
| theme               | `cucumber`、`jira` | `cucumber`     | 样式                                                                                    |
| mode                | `string`           | `gherkin_i18n` | 见[react-gherkin-editor](https://github.com/SmartBear/react-gherkin-editor)             |
| fontSize            | `number`           | `14`           |                                                                                         |
| showPrintMargin     | `boolean`          | `false`        |                                                                                         |
| showGutter          | `boolean`          | `false`        |                                                                                         |
| highlightActiveLine | `boolean`          | `false`        |                                                                                         |
| activateLinter      | `boolean`          | `false`        |                                                                                         |
| setOptions          | `object`           |                | 见[AceEditor](https://ajaxorg.github.io/ace-api-docs/interfaces/Ace.EditorOptions.html) |


#### 2、GherkinLinter
```typescript
import  { GherkinLinter } from '@xuwaer/vue3-gherkin-editor'

const linter = new GherkinLinter((val: string) => {
  console.log('parse', val) // 解析结果
})
linter.setLanguage('en')
linter.parse(data) // 需要解析的文本
```


#### 3、Ace Editor Instance
```typescript
import { computed, ref } from 'vue'
import GherkinEditor from '@xuwaer/vue3-gherkin-editor'
import { type Ace } from 'ace-builds';


<GherkinEditor
  class="full"
  v-model="content"
  showGutter
  ref="editorRef"
  activateLinter
  :setOptions="{ showLineNumbers: true }"
/>
const ghRef = ref(null)
const editor = computed<Ace.Editor>(() => ghRef.value?.editor)

```

#### 参考项目

https://github.com/ajaxorg/ace
https://github.com/SmartBear/react-gherkin-editor
https://github.com/CarterLi/vue3-ace-editor
