const path = require('path')
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = !isProduction


const filename = (ext) => isDevelopment ? `bundle.${ext}` : `bundle.[hash].${ext}`

const getJsLoaders = () => {
  const loaders = ['babel-loader']

  if (isDevelopment) {
    loaders.push('eslint-loader')
  }

  return loaders
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  // Добавляем полифиллы для корректной работы новых стандартов
  // javascript
  entry: ['@babel/polyfill', './index.js'],
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'build'),
  },
  resolve: {
    extensions: ['.js'],
    // Создаем алиасы для импортов
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
  },
  // Добавляем source-maps в режиме разработке
  devtool: isDevelopment ? 'source-map' : false,
  // devServer для обнволения в режиме реального вревмени
  devServer: {
    port: 5080,
    hot: isDevelopment,
  },
  target: 'web',
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: 'index.html',
      // Минифицируем HTML код в production версиях
      minify: {
        removeComments: isProduction,
        collapseWhitespace: isProduction,
      },
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'build'),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  module: {
    rules: [
      // Пропускаем все scss файлы через loader для
      // превращения их в конечный bundle css
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      // Пропускаем все js файлы через babel чтобы превратить
      // js код в стандарт, который будут понимать все браузеры
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: getJsLoaders(),
      }
    ],
  },
}
