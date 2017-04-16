'use strict';

const path = require('path');
const webpack = require('webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = {
  cache: true,

  devtool: 'source-map',

  entry: [
    path.resolve(__dirname, 'src', 'index.js')
  ],

  externals: {
    react: {
      amd: 'react',
      commonjs: 'react',
      commonjs2: 'react',
      root: 'React'
    }
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        include: [
          path.resolve(__dirname, 'src')
        ],
        loader: 'eslint-loader',
        options: {
          configFile: '.eslintrc',
          emitError: true,
          failOnError: true,
          failOnWarning: true,
          formatter: require('eslint-friendly-formatter')
        },
        test: /\.js$/
      }, {
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'DEV_ONLY')
        ],
        loader: 'babel-loader',
        options: {
          babelrc: false,
          cacheDirectory: true,
          plugins: [
            'transform-decorators-legacy',
            'add-module-exports'
          ],
          presets: [
            ['env', {
              loose: true,
              modules: false,
              targets: [
                'ie 9'
              ]
            }],
            'react',
            'stage-2'
          ]
        },
        test: /\.js$/
      }
    ]
  },

  output: {
    filename: 'react-pure-lifecycle.js',
    library: '',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
    umdNamedDefine: true
  },

  plugins: [
    new webpack.EnvironmentPlugin([
      'NODE_ENV'
    ]),
    new LodashModuleReplacementPlugin()
  ]
};
