// Generated using webpack-cli https://github.com/webpack/webpack-cli
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const path = require('path')
const {cpus} = require('os')
const { resolve } = require('path')

const isProduction = process.env.NODE_ENV == 'production'

const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader'

// 打包后文件路径和文件名
const JS_FILE_NAME = 'js/[name].[fullhash].js'
const CSS_FILE_NAME = 'css/[name].[fullhash].css'
const IMG_FILE_NAME = 'img/[name].[fullhash].[ext]'
const FONT_FILE_NAME = 'font/[name].[fullhash].[ext]'

const config = {
    entry: './src/main.ts',
    devtool: isProduction ? false : 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: JS_FILE_NAME,
        clean: true // 打包之前清空输出目录
    },
    devServer: {
        open: true, // 自动打开浏览器
        host: 'localhost',
        historyApiFallback: true, // vue-router使用history模式时需要开启这个，当404时自动使用index.html替代404页面
        client: {
            logging: 'error',
            overlay: {
                errors: true, // 出现错误时将错误输出到浏览器窗口
                warnings: false
            },
            progress: true, //显示编译进度
        },
        //  接口代理
        proxy: {
            '/api': 'http://localhost:3000'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
        new VueLoaderPlugin(), // 必须要加这个才能解析SFC
        new ESLintPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    reactivityTransform: true
                }
            },
            {
                test: /\.(ts|tsx)$/i,
                loader: 'babel-loader',
                options: {},
                exclude: ['/node_modules/'],
            },
            {
                test: /\.less$/i,
                use: [stylesHandler, 'css-loader', 'postcss-loader', 'less-loader'],
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg|bmp)(\?.*)?$/,
                type: 'asset', // 替代webpack5之前的url-loader
                generator: {
                    filename: IMG_FILE_NAME,
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024 // 8kb, 小于这个值的转为base64
                    }
                }
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/i,
                type: 'asset/resource', // 替代webpack5之前的url-loader
                generator: {
                    filename: FONT_FILE_NAME,
                }
            },
        ],
    },
    resolve: {
        alias: {
            src: resolve(__dirname, './src')
        },
        extensions: ['.vue', '.tsx', '.ts', '.jsx', '.js'],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: cpus().length, // 使用多进程并发运行以提高构建速度
                extractComments: false, // 不保留注释
                terserOptions: {
                    compress: {
                        drop_console: true // 去掉console相关函数
                    }
                }
            })
        ],
        splitChunks: {
            chunks: 'all',
            minSize: 10 * 1024, // 生成 chunk 的最小体积, 单位bytes
            minChunks: 1, // 拆分前必须共享模块的最小 chunks 数
            maxAsyncRequests: 50, // 按需加载时的最大并行请求数
            maxInitialRequests: 50, // 入口点的最大并行请求数
            automaticNameDelimiter: '~',
            cacheGroups: {
                router: {
                    test: /[\\/]node_modules[\\/]_?vue-router(.*)/,
                    filename: 'bundle/vue-router.js'
                },
                vue: {
                    test: /[\\/]node_modules[\\/]_?(vue|@vue)(.*)/,
                    filename: 'bundle/vue.js'
                },
                pinia: {
                    test: /[\\/]node_modules[\\/]_?pinia(.*)/,
                    filename: 'bundle/pinia.js'
                },
                element: {
                    test: /[\\/]node_modules[\\/]_?(@element-plus|element-plus)(.*)/,
                    filename: 'bundle/element-plus.js'
                },
            }
        }
    }
}

module.exports = () => {
    if (isProduction) {
        config.mode = 'production'

        const plugins = config.plugins ?? []

        plugins.push(new MiniCssExtractPlugin({
            filename: CSS_FILE_NAME
        }))
        plugins.push(new WorkboxWebpackPlugin.GenerateSW())

        config.plugins = plugins

    } else {
        config.mode = 'development'
    }
    return config
}
