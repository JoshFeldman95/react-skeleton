const path = require('path');
const entryFile = path.resolve(__dirname, 'client', 'src', 'index.js');
const outputDir = path.resolve(__dirname, 'server', 'static');

const webpack = require('webpack');

module.exports = {
  entry: ['@babel/polyfill', entryFile],
  output: {
    publicPath: '/',
    filename: 'bundle.js',
    path: outputDir + '/'
  },
  module: {
    rules: [

      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
                presets: ['@babel/preset-env',
                          '@babel/react',{
                          'plugins': ['@babel/plugin-proposal-class-properties']}]
            }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
          }
        ]
      },
      {
       test: /\.(png|jpe?g|gif)$/i,
       use: [
         {
           loader: 'file-loader',
           options: {
              outputPath: '/static',
              publicPath: '/static',
           }
         },
       ],
     },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './client/dist',
    hot: true,
    proxy: {
      '/get_nodes' : 'http://localhost:5000',
      '/static/*': 'http://localhost:5000/static/',
      '/socket.io/*': {
        target: 'http://localhost:5000',
        ws: true,
      },
    }
  }
};
