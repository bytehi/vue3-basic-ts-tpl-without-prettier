import Unocss from 'unocss/vite'
import { presetIcons } from 'unocss'

export default () => Unocss({
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
})
