import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

export const setupIconsResolver = () => IconsResolver({ prefix: 'icon', customCollections: ['custom'] })

export const setupIcons = () => Icons({
  compiler: 'vue3',
  customCollections: {
    // 这里是存放svg图标的文件地址，custom是自定义图标库的名称
    custom: FileSystemIconLoader('src/assets/icons'),
  },
  autoInstall: true,
})
