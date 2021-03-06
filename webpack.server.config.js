// Webpack configuration for server bundle

const webpack = require('webpack');
const path = require('path');

const devBuild = process.env.NODE_ENV !== 'production';
const nodeEnv = devBuild ? 'development' : 'production';

module.exports = {
  // the project dir
  context: __dirname,

  // Vendor and entry point of the app
  entry: [
    'babel-polyfill',
    'react-dom/server',
    'react',
    './app/assets/javascripts/components',
  ],
  // Bundled output path
  output: {
    filename: 'server-bundle.js',
    path: './app/assets/webpack',
  },

  // Extensions to resolve
  resolve: {
    extensions: ['', '.js', '.jsx', '.es6.js'],
    alias: {
      lib: path.join(process.cwd(), 'app', 'lib'),
    },
  },
  // Add plugins
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv),
      },
    }),
  ],
  module: {
    loaders: [
      // react-rails would need certain global objects plus we need to use babel loader
      // for ES6 code
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: require.resolve('jquery'), loader: 'expose?jQuery' },
      { test: require.resolve('jquery'), loader: 'expose?$' },
      { test: require.resolve('react'), loader: 'expose?React' },
      { test: require.resolve('react-dom/server'), loader: 'expose?ReactDOMServer' }
    ],
  },
};
