import path from 'path'
import webpack from 'webpack'

const DEBUG = !process.argv.includes('release')
const VERBOSE = process.argv.includes('verbose')
const MODE = DEBUG ? 'development' : 'production'
const GLOBALS = {
  'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
  __DEV__: DEBUG,
}

// 打入 babel 所需要的 runtime，生产环境不再需要安装 babel packages
const config = {
  context: path.resolve(__dirname, '../src'),

  entry: ['@babel/polyfill/noConflict', './start.js'],

  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'server.js',
    libraryTarget: 'commonjs2',
  },

  target: 'node',

  externals: [
    { formidable: 'commonjs formidable' },
  ],

  mode: MODE,
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install()',
      raw: true,
      entryOnly: false,
    }),
    new webpack.IgnorePlugin(/^pg-native$/),
  ],

  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },

  devtool: DEBUG ? 'cheap-module-source-map' : 'source-map',

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, '../src'),
        ],
        query: {
          // https://github.com/babel/babel-loader#options
          cacheDirectory: DEBUG,
        },
      },
      {
        test: /\.txt$/,
        loader: 'raw-loader',
      },
    ],
  },

  resolve: {
    modules: [
      path.resolve(__dirname, '../src'),
      'node_modules',
    ],
    extensions: ['.webpack.js', '.web.js', '.js', '.jsx', '.json'],
  },

  cache: DEBUG,

  stats: {
    colors: true,
    reasons: DEBUG,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE,
  },

}
export default [config]
