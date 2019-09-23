const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const { resolve, join } = require('path')
const package = require('./package.json')

const r = path => resolve(__dirname, path)
const isProdMode =
  process.argv.indexOf('-p') >= 0 || process.env.NODE_ENV === 'production'

var sourcePath = join(__dirname, './src');
var outPath = join(__dirname, './build');

module.exports = {
  context: sourcePath,
  entry: {
    app: './main.tsx',
  },
  output: {
    path: outPath,
    filename: isProdMode ? '[contenthash].js' : '[hash].js',
    chunkFilename: isProdMode ? '[name][contenthash].js' : '[name][hash].js',
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    mainFields: ['module', 'browser', 'main'],
    alias: {
      '@app': sourcePath,
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          !isProdMode && {
            loader: 'babel-loader',
            options: {
              plugins: [
                'react-hot-loader/babel'
              ],
            },
          },
          'ts-loader',
        ].filter(Boolean),
      },
      {
        test: /\.css$/,
        use: [
          isProdMode ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            query: {
              modules: true,
              sourceMap: !isProdMode,
              importLoaders: 1,
              localIdentName: isProdMode
                ? '[hash:base64:5]'
                : '[local]__[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('postcss-import')({ addDependencyTo: webpack }),
                require('postcss-url')(),
                require('postcss-preset-env')({
                  /* use stage 2 features (defaults) */
                  stage: 2,
                }),
                require('postcss-reporter')(),
                require('postcss-browser-reporter')({
                  disabled: isProdMode,
                }),
              ],
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.(a?png|svg)$/,
        use: 'url-loader?limit-100000',
      },
      {
        test: /\.(jpe?g|gif|bmp|mp3|mp4|ogg|wav|eot|ttf|woff|woff2)$/,
        use: 'file-loader',
      },
    ],
  },
  optimization: {
    splitChunks: {
      name: true,
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          filename: isProdMode ? 'vendor.[contenthash].js' : 'vendor.[hahs].js',
          priority: -10,
        },
      },
    },
    runtimeChunk: true,
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      DEBUG: false,
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[hash].css',
      disable: !isProdMode,
    }),
    new HtmlWebpackPlugin({
      template: '../public/index.html',
      minify: {
        minifyJS: true,
        minifiyCSS: true,
        removeComments: true,
        useShortDoctype: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
      },
      append: {
        head: `<script src="//cdn.polyfill.io/v3/polyfill.min.js"></script>`,
      },
      meta: {
        title: package.name,
        description: package.description,
        keywords: Array.isArray(package.keywords)
          ? package.keywords.join(',')
          : undefined,
      },
    }),
  ],
  devServer: {
    contentBase: outPath,
    hot: true,
    inline: true,
    historyApiFallback: {
      disableDotRule: true,
    },
    stats: 'minimal',
    clientLogLevel: 'warning',
  },
  devtool: isProdMode ? 'hidden-source-map' : 'cheap-module-eval-source-map',
  node: {
    fs: 'empty',
    net: 'empty',
  },
}
