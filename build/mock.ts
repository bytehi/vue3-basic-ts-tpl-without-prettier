// https://github.com/vbenjs/vite-plugin-mock/blob/main/README.zh_CN.md
import { viteMockServe } from 'vite-plugin-mock'

export function setupMockServer() {
  return viteMockServe({
    mockPath: 'mock',
    localEnabled: true,
    prodEnabled: false,
    logger: true,
  })
}
