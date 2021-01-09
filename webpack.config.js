const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = () => {
  const configs = {
    entry: "./src/index.js",
    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
      }),
    ],
    devtool: "inline-source-map",
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        },
      ],
    },
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      port: 9000,
      open: true,
    },
  };
  return configs;
};
