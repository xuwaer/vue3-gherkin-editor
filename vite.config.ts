import { fileURLToPath, URL } from 'node:url'
import terser from '@rollup/plugin-terser'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./example', import.meta.url))
    }
  },
  build: {
    lib: {
      // 构建为库。如果指定了 build.lib，build.cssCodeSplit 会默认为 false。
      // __dirname的值是vite.config.ts文件所在目录
      entry: resolve(__dirname, 'packages/index.ts'),  // entry是必需的，因为库不能使用HTML作为入口。
      name: 'GherkinEditor', // 暴露的全局变量
      fileName: 'vue3-gherkin-editor' // 输出的包文件名，默认是package.json的name选项
    },
    rollupOptions: {
      // 自定义底层的Rollup打包配置
      plugins: [terser()],
      // https://rollupjs.org/configuration-options/
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // format: 'es', // 默认es，可选 'amd' 'cjs' 'es' 'iife' 'umd' 'system'
        exports: 'named', // https://rollupjs.org/configuration-options/#output-exports
        // 在大多数情况下，该选项值为 false 将避免 Rollup 生成多余代码的 getters，因此在很多情况下，可以使代码兼容 IE8。
        externalLiveBindings: false, // 当该选项的值为 false 时，Rollup 不会为外部依赖生成支持动态绑定的代码，而是假定外部依赖永远不会改变。这使得 Rollup 会生成更多优化代码。请注意，当外部依赖存在循环引用时，该选项值为 false 可能会引起问题。
        //   // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        }
      }
    },

    /** 设置为 false 可以禁用最小化混淆，或是用来指定使用哪种混淆器。
        默认为 Esbuild，它比 terser 快 20-40 倍，压缩率只差 1%-2%。
        注意，在 lib 模式下使用 'es' 时，build.minify 选项不会缩减空格，因为会移除掉 pure 标注，导致破坏 tree-shaking。
        当设置为 'terser' 时必须先安装 Terser。（yarn add terser -D）
    */
    // minify: 'terser', // Vite 2.6.x 以上需要配置 minify: "terser", terserOptions 才能生效
    // terserOptions: { // 在打包代码时移除 console、debugger 和 注释
    //   compress: {
    //     /* (default: false) -- Pass true to discard calls to console.* functions.
    //       If you wish to drop a specific function call such as console.info and/or
    //       retain side effects from function arguments after dropping the function
    //       call then use pure_funcs instead
    //     */
    //     drop_console: true, // 生产环境时移除console
    //     drop_debugger: true
    //   },
    //   format: {
    //     comments: false // 删除注释comments
    //   }
    // }
    reportCompressedSize: false, // 默认 true，启用/禁用 gzip 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
  },
  server: {
    host: true, // 指定服务器应该监听哪个 IP 地址。 如果将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址。
    port: 9000, // 指定开发服务器端口
    open: true // 开发服务器启动时，自动在浏览器中打开应用程序。当该值为字符串时，它将被用作 URL 的路径名。
  }
})
