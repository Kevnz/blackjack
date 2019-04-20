const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./config')

const devConfig = {
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Custom template',
      template: './src/ui/index.html',
      historyApiFallback: true,
    }),
  ],
  devServer: {
    contentBase: './public',
    hot: false,
  },
}

module.exports = {
  ...baseConfig,
  ...devConfig,
}
