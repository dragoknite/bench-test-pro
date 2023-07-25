const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  entry: './src/frontend/client/main.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
            }
          }
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      // {
      //   // loads .html files
      //   test: /\.(html)$/,
      //   include: [path.resolve(__dirname, "./src")],
      //   use: {
      //       loader: "html-loader"
      //   }
      // },
    ],
  },
  resolve: {
    extensions: ['.jsx', '.js', '.ts', '.tsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/frontend/index.html',
      filename: './index.html',
    }),
    new CopyPlugin({
      patterns: [{ from: './src/frontend/style.css' }],
    }),
  ],
  devServer: {
    port: 3351,
    static: {
      directory: path.join(__dirname, './dist'),
    },
    proxy: {
      '/api': 'http://localhost:4000',
      secure: false,
    },
  },
};