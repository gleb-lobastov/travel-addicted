import webpack from 'webpack';
import path from 'path';

export default {
  devtool: 'inline-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './client.jsx',
  ],
  output: {
    path: __dirname + '/../dist/',
    publicPath: '/dist',
    filename: 'bundle.js',
    sourceMapFilename: '[name].js.map',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [
          // 'react-hot-loader/webpack',
          'babel-loader',
        ],
      }, {
        test: /\.scss$/,
        use: [{
          // creates style nodes from JS strings
          loader: 'style-loader',
        }, {
          // translates CSS into CommonJS
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        }, {
          // compiles Sass to CSS
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        }],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss', '.css'],
    alias: {
      tools: path.resolve(__dirname, '../app/tools'),
      lib: path.resolve(__dirname, '../app/lib'),
      components: path.resolve(__dirname, '../app/components'),
    },
  },
  devServer: {
    host: 'localhost',
    port: 3000,

    // respond to 404s with index.html
    historyApiFallback: true,

    // enable HMR on the server
    hot: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
    }),

    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),

    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),

    // do not emit compiled assets that include errors
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};
