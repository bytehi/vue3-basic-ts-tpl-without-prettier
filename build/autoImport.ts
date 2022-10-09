// 支持自动引入API函数
import AutoImport from 'unplugin-auto-import/vite'

export default () =>
  // https://github.com/antfu/unplugin-auto-import
  AutoImport({
    // 生成auto-import.d.ts声明文件
    dts: 'src/auto-imports.d.ts',
    // targets to transform
    include: [
      /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      /\.vue$/,
      /\.vue\?vue/, // .vue
    ],
    imports: ['vue', 'vue-router', 'pinia'],
    // 解决eslint报错
    eslintrc: {
      enabled: true,
      filepath: './.eslintrc-auto-import.json',
      // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      globalsPropValue: true,
    },
  })
