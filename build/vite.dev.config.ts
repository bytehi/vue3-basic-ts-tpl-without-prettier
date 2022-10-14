export default {
  server: {
    host: 'localhost',
    // port: 3001,
    // 是否自动在浏览器打开
    open: true,
    // 是否开启 https
    https: false,
    // 服务端渲染
    // ssr: false,
    // 网络代理
    proxy: {
      '/api/mock': {
        target: 'http://localhost:5173/',
        changeOrigin: true,
        ws: true,
        rewrite: pathStr => pathStr.replace('/api', ''),
      },
      '/test': {
        target: 'http://cicd-test.xgjktech.com.cn/',
        changeOrigin: true,
        ws: true,
        rewrite: pathStr => pathStr.replace('/test', ''),
      },
    },
  },
}
