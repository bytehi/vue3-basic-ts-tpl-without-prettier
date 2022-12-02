import type { ConfigEnv, UserConfigExport } from 'vite'

import vue from '@vitejs/plugin-vue'
// 支持在script标签中使用name属性，如: <script setup name="MyComp"></script>
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import WindiCSS from 'vite-plugin-windicss'

import setupAutoImport from './build/autoImport'
import setupComponents from './build/components'
import setupUnocss from './build/unocss'
import { setupMockServer } from './build/mock'

import setupCompressPlugin from './build/compressPlugin'

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfigExport => {
  const isProd = mode === 'production'

  return {
    plugins: [
      setupAutoImport(),
      setupComponents(),
      vue(),
      vueSetupExtend(),
      WindiCSS(),
      setupUnocss(),
      setupMockServer(),

      isProd && setupCompressPlugin(),
    ],
    resolve: {
      // 查找别名
      alias: [{ find: '@', replacement: '/src' }],
      // 导入时想要省略的扩展名列表
      extensions: ['.js', '.vue', '.json', '.scss', '.ts', '*'],
    },
    server: {
      host: 'localhost',
      // port: 3001,
      // 是否自动在浏览器打开
      open: true,
      // 是否开启 https
      https: false,
      // 网络代理
      proxy: {
        '/api': {
          target: 'http://localhost:5173/',
          changeOrigin: true,
          ws: true,
          rewrite: pathStr => pathStr.replace('/api', ''),
        },
        '/mock': {
          target: 'http://localhost:5173/',
          changeOrigin: true,
          ws: true,
          rewrite: pathStr => pathStr.replace('/mock', ''),
        },
      },
    },
  }
}
