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
    resolve: {
      alias: {
        "@components": path.resolve(__dirname, "src/components"),
        "@styles": path.resolve(__dirname, "src/styles"),
      },
    },
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
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
              },
            },
            // Compiles Sass to CSS
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
              },
            },
          ],
        },
      ],
    },
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      port: 9000,
      open: true,
      historyApiFallback: true,
    },
  };
  return configs;
};
