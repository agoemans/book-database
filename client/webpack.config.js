const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    target: "web",
    output: {
        path: path.resolve(__dirname, '_build'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
              test: /\.(ts|tsx)$/,
                loader: "awesome-typescript-loader",
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"]
                }
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader",
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },
    devServer: {
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin(
        {
            template: path.resolve(__dirname, 'templates', 'index.html'),
            filename: "./index.html"
        })
    ]
};