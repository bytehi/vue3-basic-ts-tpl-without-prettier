import vue from '@vitejs/plugin-vue'
/**
 * 扩展setup插件，支持在script标签中使用name属性
 * usage: <script setup name="MyComp"></script>
 */
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import WindiCSS from 'vite-plugin-windicss'
/**
 * 组件库按需引入插件
 * usage: 直接使用组件,无需在任何地方导入组件
 */
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// 支持自动引入API函数
import AutoImport from 'unplugin-auto-import/vite'

import Unocss from 'unocss/vite'
import { presetIcons } from 'unocss'

import { setupMockServer } from './mock'

export default {
  plugins: [
    vue(),
    vueSetupExtend(),
    WindiCSS(),
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
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: true,
        }),
      ],
    }),
    Unocss({
      presets: [
        presetIcons({
          scale: 1.2,
          warn: true,
        }),
      ],
      // 以下配置是为了可以直接使用标签 <i-ep-edit />
      variants: [
        {
          match: (s) => {
            if (s.startsWith('i-')) {
              return {
                matcher: s,
                selector: (s) => {
                  return s.startsWith('.') ? `${s.slice(1)},${s}` : s
                },
              }
            }
          },
        },
      ],
    }),
    setupMockServer(),
  ],
  resolve: {
    // 查找别名
    alias: [{ find: '@', replacement: '/src' }],
    // 导入时想要省略的扩展名列表
    extensions: ['.js', '.vue', '.json', '.scss', '.ts', '*'],
  },
}
