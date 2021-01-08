const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        use: ["ts-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.mp3$/,
        loader: "file-loader",
        query: { name: "static/media/[name].[hash:8].[ext]" },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".mp3"],
  },
};
