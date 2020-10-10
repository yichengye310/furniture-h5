const webpack = require('webpack')

module.exports = {
    publicPath: './',//配置根目录
    outputDir: 'dist',//构建输出目录
    assetsDir: "assets",//静态资源目录（js,css,image）
    lintOnSave: false, //是否开启eslint检测,false不开启，有效值：true || false
    productionSourceMap: true,//生成环境下面开启sourceMap支持断点调试
    devServer: {
        open: true, //是否启动打开浏览器
        host: "0.0.0.0",//主机，0.0.0.0支持局域网地址，可以用真机测试
        port: 8082, //端口
        https: false,//是否启动https
        //配置跨域代理http,https
        proxy: {
            '/api': {
                target: 'http://36.154.123.82:8082',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '^/socket': {
                target: 'http://36.154.123.82:8082/socket',
                changeOrigin: true,
                pathRewrite: {
                    '/socket': ''
                }
            }
        },
    },
    configureWebpack: config => {
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "windows.jQuery": "jquery"
            })
        ],
        config.externals = {
            "BMap": "BMap",
        }
    },
};
