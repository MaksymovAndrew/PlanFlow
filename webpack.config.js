const path = require("path");
const CleanPlugin = require("clean-webpack-plugin");
module.exports = {
  mode: "development",
  entry: "./src/app.js",
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "assets", "scripts"),
    publicPath: "assets/scripts/",
  },

  devServer: {
    static: {
      directory: path.resolve(__dirname),
    },
    port: 3000,
  },
  plugins: [new CleanPlugin.CleanWebpackPlugin()],
};
