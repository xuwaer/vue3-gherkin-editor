# vue3-gherkin-editor

gherkin-editor for vue3

#### GherkinEditor.vue

```typescript
import GherkinEditor from '@xuwaer/vue3-gherkin-editor'

<gherkin-editor
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


#### GherkinLinter.ts
```typescript
import  { GherkinLinter } from '@xuwaer/vue3-gherkin-editor'

const linter = new GherkinLinter((val: string) => {
  console.log('parse', val) // 解析结果
})
linter.setLanguage('en')
linter.parse(data) // 需要解析的文本
```

#### 参考项目

https://github.com/SmartBear/react-gherkin-editor
https://github.com/CarterLi/vue3-ace-editor
