const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    app: [require.resolve("webpack-dev-server/client") + "?/", require.resolve("webpack/hot/dev-server"), path.resolve(__dirname, "./src/section-09/app.ts")],
  },
  devtool: "eval-cheap-module-source-map",
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "public"),
    publicPath: "/",
    pathinfo: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          configFile: path.resolve(__dirname, "tsconfig.json"),
        },
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "*.css", context: path.resolve(".", "src/section-09") }],
    }),
    new HtmlPlugin({
      template: path.resolve(__dirname, "src/section-09/index.html"),
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  stats: {
    all: false,
    errors: true,
    errorDetails: true,
    warnings: true,
    timings: true,
    colors: true,
    builtAt: true,
  },
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true,
    contentBase: path.resolve(__dirname, "build"),
    publicPath: "/",
    host: "0.0.0.0",
    port: 3000,
    open: true,
    clientLogLevel: "none",
    watchContentBase: true,
  },
};
