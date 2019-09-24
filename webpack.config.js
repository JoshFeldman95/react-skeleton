// const path = require('path');
// const entryFile = path.resolve(__dirname, 'client', 'src', 'index.js');
// const outputDir = path.resolve(__dirname, 'server', 'static');
//
// const webpack = require('webpack');
//
// module.exports = {
//   entry: ['@babel/polyfill', entryFile],
//   output: {
//     publicPath: '/',
//     filename: 'bundle.js',
//     path: outputDir + '/'
//   },
//   module: {
//     rules: [
//
//       {
//         test: /\.(js|jsx)$/,
//         loader: 'babel-loader',
//         exclude: /node_modules/,
//         options: {
//                 presets: ['@babel/preset-env',
//                           '@babel/react',{
//                           'plugins': ['@babel/plugin-proposal-class-properties']}]
//             }
//       },
//       {
//         test: /\.(scss|css)$/,
//         use: [
//           {
//             loader: 'style-loader'
//           },
//           {
//             loader: 'css-loader',
//           }
//         ]
//       },
//       {
//        test: /\.(png|jpe?g|gif)$/i,
//        use: [
//          {
//            loader: 'file-loader',
//            options: {
//               outputPath: '/static',
//               publicPath: '/static',
//            }
//          },
//        ],
//      },
//     ]
//   },
//   plugins: [
//     new webpack.HotModuleReplacementPlugin()
//   ],
//   devServer: {
//     contentBase: './client/dist',
//     hot: true,
//     proxy: {
//       '/get_nodes' : 'http://localhost:5000',
//       '/static/*': 'http://localhost:5000/static/',
//       '/socket.io/*': {
//         target: 'http://localhost:5000',
//         ws: true,
//       },
//     }
//   }
// };


const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');

const paths = {
  src: path.resolve(__dirname, 'src'),
  build: path.resolve(__dirname, 'build')
}

const uglifyConfig = {
  sourceMap: false,
  warnings: false,
  mangle: true,
  minimize: true
}

const htmlConfig = {
  template: path.join(paths.src, 'index.html'),
  minify : {
    collapseWhitespace: true
  }
}

const common = {
  devServer: {
    contentBase: path.join(__dirname, 'build'),
  },
  entry: path.join(paths.src, 'index.js'),
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets:
              [
                '@babel/preset-env',
                '@babel/react',
                {
                  'plugins': ['@babel/plugin-proposal-class-properties']
                }
              ]
          }
        }
      },
      {
        test: /\.(ts)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'awesome-typescript-loader',
          options: {
            useCache: false,
          }
        }
      },
      {
        test: /\.(css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test:  /\.(png|jpe?g|gif|)$/i,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      },
      // {
      //   test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: '[name].[ext]',
      //         outputPath: 'fonts/'
      //       }
      //     }
      //   ]
      // }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(htmlConfig),
    new ExtractTextPlugin('styles.[hash].css'),
  ]
};

const devSettings = {
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/get_nodes' : 'http://localhost:5000',
      '/static/*': 'http://localhost:5000/static/',
      '/socket.io/*': {
        target: 'http://localhost:5000',
        ws: true,
      },
    }
  },
  output: {
    path: paths.build,
    filename: 'bundle.[hash].js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
  ]
}

const prodSettings = {
  devtool: 'source-map',
  output: {
    path: paths.build,
    filename: 'bundle.[hash].js',
    publicPath: '/build/'
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env': {
      NODE_ENV: JSON.stringify('production')
    }}),
    new OptimizeCssAssetsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ]
}

/**
* Exports
**/

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

if (TARGET === 'start') {
  module.exports = merge(common, devSettings)
}

if (TARGET === 'build' || !TARGET) {
  module.exports = merge(common, prodSettings)
}
