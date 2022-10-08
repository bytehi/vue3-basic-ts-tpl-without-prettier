import type { ConfigEnv, UserConfig } from 'vite'
import { merge } from 'webpack-merge'
import baseConfig from './build/vite.base.config'
import prodConfig from './build/vite.prod.config'

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const isProd = mode === 'production'
  const envConfig = isProd ? prodConfig : {}

  return merge(baseConfig, envConfig)
}
