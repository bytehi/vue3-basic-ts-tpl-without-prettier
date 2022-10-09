/**
 * 组件库按需引入插件
 * usage: 直接使用组件,无需在任何地方导入组件
 */
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default () =>
  Components({
    resolvers: [
      ElementPlusResolver({
        importStyle: true,
      }),
    ],
  })
