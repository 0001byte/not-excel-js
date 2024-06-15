const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProd = process.env.NODE_ENV === "production"
const isDev = !isProd;

const getFileName = (ext) => isDev ? `bundle.dev.[hash].${ext}` : `bundle.prod.[hash].${ext}`
const getLoaders = () => {
    const loaders = [
        {
            loader: "babel-loader",
            options: {
                presets: ['@babel/preset-env']
            }
        }
    ];

    // if (isDev) loaders.push("eslint-loader");

    return loaders;
}

module.exports = {
    context: path.resolve(__dirname, "src"),
    mode: "development",
    entry: ["@babel/polyfill", "./index.js"],
    output: {
        filename: getFileName("js"),
        path: path.resolve(__dirname, "dist")
    },
    resolve: {
        extensions: [".js"],
        alias: {
          "@": path.resolve(__dirname, "src"),
          "@/core": path.resolve(__dirname, "src/core"),
        },
    },
    devtool: isDev ? "source-map" : false,
    devServer: {
        port: 3031,
        hot: isDev,
        static: {
            directory: path.resolve(__dirname, "src"),
        },
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "index.html",
            favicon: "favicon.ico",
            minify: {
                removeComments: isProd,
                collapseWhitespace: isProd,
            }
        }),
        new MiniCssExtractPlugin({
            filename: getFileName("css"),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: getLoaders(isDev),
            }
        ],
    },
}
