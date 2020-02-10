const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const path = require("path");
const IS_PROD = process.argv.indexOf("-p") > -1;

module.exports = {
  devtool: IS_PROD ? "source-map" : "eval",
  entry: path.resolve(__dirname, "app/js/main.ts"),
  output: {
    filename: "bundle.js",
    path: IS_PROD ? path(process.cwd(), "./demo") : process.cwd()
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.ts$/,
        loader: "tslint-loader?emitErrors=false&failOnHint=false",
        exclude: /node_modules/
      },
      {
        test: /\.ts$/,
        use: [
          { loader: "awesome-typescript-loader" },
          { loader: "angular2-template-loader" }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.html$|\.css$/,
        loader: "raw-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"],
    modules: [path.join(__dirname, "node_modules")],
    alias: {
      "cloudinary-core": "cloudinary-core/cloudinary-core-shrinkwrap.js"
    }
  },
  devServer: {
    port: 8002,
    inline: true,
    hot: true,
    historyApiFallback: true,
    contentBase: "app"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      ENV: JSON.stringify(IS_PROD ? "production" : "development")
    }),
    new ExtractTextPlugin("stylesheets/[name].css"),
    new FilterWarningsPlugin({
      exclude: /System.import/
    }),
    new webpack.ContextReplacementPlugin(/\@angular(\\|\/)core(\\|\/)fesm5/, path.join(__dirname, './client')),
  ]
};
