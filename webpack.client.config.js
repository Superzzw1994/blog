const webpack = require('webpack')
const path = require('path')

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, '/src/client/index.js'),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.jsx']
  }
}
