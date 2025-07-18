const dotenv = require("dotenv");
const path = require("path");
const Dotenv_ = require('dotenv-webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
dotenv.config({ path: path.resolve(__dirname, "./.env") });

// const exposes = {

// }
// const remotes = {

// };
module.exports = {

    entry: "./src/App.tsx",
    mode: "development",
    output: {
        path: path.join(__dirname, "/build"),
        publicPath: process.env.USER_SERVICES_PUBLIC_PATH,
        filename: process.env.USER_SERVICES_FILE_NAME
    },
    devServer: {
        historyApiFallback: true,
        allowedHosts: 'all',
        port: 3001,
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.png', '.jpg']
    },
    module: {
        rules: [
            {
                test: /\.(js|ts|tsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource',
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
        new Dotenv_(),
        new ModuleFederationPlugin({
            name: 'userServices',
            filename: process.env.USER_SERVICES_REMOTE_FILENAME,
            // remotes,
            shared: {
                react: { singleton: true, eager: false, requiredVersion: false },
                "react-dom": { singleton: true, eager: false, requiredVersion: false },
                'react-router-dom': { singleton: true, requiredVersion: '^7.6.2' },
            },
            // exposes,
        }),

    ]
};
