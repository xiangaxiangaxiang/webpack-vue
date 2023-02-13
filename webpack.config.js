// Generated using webpack-cli https://github.com/webpack/webpack-cli
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
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
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: JS_FILE_NAME,
        clean: true // 打包之前清空输出目录
    },
    devServer: {
        open: true, // 自动打开浏览器
        host: 'localhost',
        historyApiFallback: true
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
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    },
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
