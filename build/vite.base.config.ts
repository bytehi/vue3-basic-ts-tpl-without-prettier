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

import setupAutoImport from './autoImport'
import setupUnocss from './unocss'
import { setupMockServer } from './mock'

export default {
  plugins: [
    vue(),
    vueSetupExtend(),
    WindiCSS(),
    setupUnocss(),
    setupMockServer(),
    setupAutoImport(),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: true,
        }),
      ],
    }),
  ],
  resolve: {
    // 查找别名
    alias: [{ find: '@', replacement: '/src' }],
    // 导入时想要省略的扩展名列表
    extensions: ['.js', '.vue', '.json', '.scss', '.ts', '*'],
  },
}
