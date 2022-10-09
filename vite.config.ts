import type { ConfigEnv, UserConfigExport } from 'vite'
import { merge } from 'webpack-merge'
import baseConfig from './build/vite.base.config'
import devConfig from './build/vite.dev.config'
import prodConfig from './build/vite.prod.config'

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfigExport => {
  const isProd = mode === 'production'

  return merge([baseConfig, devConfig, (isProd ? prodConfig : {})])
}
