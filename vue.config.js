//
module.exports= {
    // baseUrl : './',
    // publicPath: './', //配置基本的根目录 ，以前是baseUrl, 不写默认也是 '/'
    // outputDir: 'dist',//当我们的项目打包的时候的导出目录 , 我们在终端输入npm run build
    // assetsDir: 'assets',//(解决静态资源的问题)配置我们静态资源的目录 （js ,css,img ,fonts）
    // lintOnSave: false, //是否开启eslint保存检测，我们一般不开启，
    //上面就是最基本的配置
    //下面是官方指定配置  只需修改JingDong 为你的项目名称，然后把导出的包改成JingDong 即可
    publicPath: process.env.NODE_ENV === 'production' ? '/JingDong/' : '/',
    //配置我们脚手架 的基本服务器的信息
    devServer: {
        open: true,//在 运行成功的时候是否自动打开浏览器
        host: 'localhost', //本地服务器的地址
        port: '8081', //自己重新输入端口号
        https: false,// 是否使用https协议，默认为true
        hotOnly: false, //

        //
        //自行复制黏贴
        proxy: {
            '/api':{
                target: 'http://127.0.0.1:8080/backend',  // 后台api
                changeOrigin: true,  //是否跨域
                secure: false, // 是否是https
                pathRewrite: {
                    '^/api': ''   //需要rewrite的,
                }
            }
        }
    },

}