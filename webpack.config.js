const path = require("path");

module.exports = {
  entry: "./draw.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname)
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ["ts-loader"],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  }
};
