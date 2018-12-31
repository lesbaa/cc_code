/* eslint-env node */

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './app/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './app/template.html',
    }),
    new CopyWebpackPlugin([
      {
        from: './app/static',
        to: 'static',
      },
    ]),
  ],
  module: {
    rules: [
      { test: /\.(glsl|frag|vert)$/, use: { loader: 'raw-loader' }, exclude: /node_modules/ },
      { test: /\.(glsl|frag|vert)$/, use: { loader: 'glslify-loader' }, exclude: /node_modules/ },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
            ],
            plugins: [
              '@babel/plugin-transform-runtime',
              '@babel/plugin-proposal-class-properties',
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              '@babel/plugin-proposal-do-expressions',
              '@babel/plugin-proposal-export-default-from',
              '@babel/plugin-proposal-export-namespace-from',
              '@babel/plugin-proposal-function-bind',
              '@babel/plugin-proposal-function-sent',
              '@babel/plugin-proposal-json-strings',
              '@babel/plugin-proposal-logical-assignment-operators',
              '@babel/plugin-proposal-nullish-coalescing-operator',
              '@babel/plugin-proposal-numeric-separator',
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-proposal-optional-chaining',
              ['@babel/plugin-proposal-pipeline-operator', { 'proposal': 'minimal' }],
              '@babel/plugin-proposal-throw-expressions',
              '@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-syntax-import-meta',
            ],
          },
        },
      },
    ],
  },
}
