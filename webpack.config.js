const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname)
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        use: ["ts-loader"],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  }
};
