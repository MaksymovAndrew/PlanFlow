//dont need this option, just because 
const path = require("path");
const CleanPlugin = require("clean-webpack-plugin");
module.exports = {
  mode: "production",
  entry: "./src/app.js",
  output: {
    filename: "app.js", //    filename: "[contenthash].js",
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
