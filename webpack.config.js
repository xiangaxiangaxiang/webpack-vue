
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const path = require('path')
const {cpus} = require('os')
const { resolve } = require('path')

const isProduction = process.env.NODE_ENV == 'production'

// 不同环境使用不同配置，也可以分别创建webpack.prod.config.js和webpack.dev.confog.js分别配置
const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader'
const sourceMap = isProduction ? false : 'source-map'
const moduleIds = isProduction ? 'deterministic' : 'named'
const chunkIds = isProduction ? 'deterministic' : 'named'
const minimizer = isProduction
    ? [
        new TerserPlugin({
            parallel: cpus().length, // 使用多进程并发运行以提高构建速度
            extractComments: false, // 不剥离注释 （/^\**!|@preserve|@license|@cc_on/i）
            terserOptions: {
                compress: {
                    drop_console: true // 去掉console相关函数
                },
                format: {
                    comments: false // 去掉注释
                }
            }
        })
    ]
    : []

// 打包后文件路径和文件名
const JS_FILE_NAME = 'js/[name].[contenthash:8].js'
const CSS_FILE_NAME = 'css/[name].[contenthash:8].css'
const IMG_FILE_NAME = 'img/[name][ext]'
const FONT_FILE_NAME = 'font/[name][ext]'



const config = {
    entry: './src/main.ts',
    devtool: sourceMap,
    output: {
        pathinfo: false,
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
        new ESLintPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    'thread-loader',
                    {
                        loader: 'vue-loader',
                        options: {
                            reactivityTransform: true // 开启响应式语法糖
                        }
                    }
                ]
            },
            {
                test: /\.(ts|tsx)$/i,
                use: ['thread-loader', 'babel-loader'],
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
        minimize: isProduction,
        minimizer,
        moduleIds,
        chunkIds,
        sideEffects: false,
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
                    priority: 20,
                    filename: 'bundle/vue-router.js'
                },
                vue: {
                    test: /[\\/]node_modules[\\/]_?(vue|@vue)(.*)/,
                    priority: 20,
                    filename: 'bundle/vue.js'
                },
                pinia: {
                    test: /[\\/]node_modules[\\/]_?pinia(.*)/,
                    priority: 20,
                    filename: 'bundle/pinia.js'
                },
                element: {
                    test: /[\\/]node_modules[\\/]_?(@element-plus|element-plus)(.*)/,
                    priority: 40,
                    filename: 'bundle/element-plus.js'
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    filename: 'bundle/common-vendors.js'
                },
            }
        },
    }
}

module.exports = () => {
    if (isProduction) {
        config.mode = 'production'

        const plugins = config.plugins ?? []

        plugins.push(
            new MiniCssExtractPlugin({
                filename: CSS_FILE_NAME
            }),
            new SpeedMeasurePlugin() // 输出各loader、plugin打包用时，可以针对性优化
        )

        config.plugins = plugins

    } else {
        config.mode = 'development'
    }
    return config
}
