module.exports = {
    // 修改的配置
    // 将baseUrl: '/api',改为baseUrl: '/',
    baseUrl: '//././',//././
    devServer: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8090',//此处坑，以前没加http 会不通
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
// .env.development
/*
VUE_APP_BASE_API=/api*/
