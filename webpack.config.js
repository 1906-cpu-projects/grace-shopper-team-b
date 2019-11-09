const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'assets')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env', '@babel/react'],
          plugins: [
            ['@babel/transform-runtime'],
            ['@babel/plugin-proposal-class-properties'],
            [
              new HTMLWebpackPlugin({
                template: 'index.html'
              })
            ]
          ]
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
