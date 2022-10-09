import vue from '@vitejs/plugin-vue'
// 支持在script标签中使用name属性，如: <script setup name="MyComp"></script>
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import WindiCSS from 'vite-plugin-windicss'

import setupAutoImport from './autoImport'
import setupComponents from './components'
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
    setupComponents(),
  ],
  resolve: {
    // 查找别名
    alias: [{ find: '@', replacement: '/src' }],
    // 导入时想要省略的扩展名列表
    extensions: ['.js', '.vue', '.json', '.scss', '.ts', '*'],
  },
}
