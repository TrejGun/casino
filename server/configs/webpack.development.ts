import path from "path";
import {Configuration, HotModuleReplacementPlugin} from "webpack";
import DotEnvPlugin from "dotenv-webpack";
import CopyPlugin from "copy-webpack-plugin";

const config: Configuration = {
  mode: "development",
  devtool: "cheap-module-source-map",
  entry: {
    main: ["webpack-hot-middleware/client", "./client"],
  },
  output: {
    path: path.join(__dirname, "..", "..", "dist", "bundle"),
    filename: "[name].js",
    sourceMapFilename: "[file].map",
    chunkFilename: "[id].js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    modules: ["node_modules"],
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
    fallback: {
      path: require.resolve("path-browserify"),
    },
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: "babel-loader",
            options: {
              babelrc: false,
              presets: [
                [
                  "@babel/env",
                  {
                    modules: false,
                    targets: {
                      browsers: ["> 1%"],
                    },
                  },
                ],
                [
                  "@babel/typescript",
                  {
                    isTSX: true,
                    allExtensions: true,
                  },
                ],
                "@babel/react",
              ],
              plugins: [
                "optimize-clsx",
                "@babel/plugin-proposal-nullish-coalescing-operator",
                "@babel/plugin-proposal-optional-chaining",
                "react-hot-loader/babel",
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new DotEnvPlugin({
      path: ".env",
      systemvars: true,
    }),
    new CopyPlugin({
      patterns: [{from: "./static", to: "./"}],
    }),
    new HotModuleReplacementPlugin(),
  ],
  performance: {
    hints: false,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  watchOptions: {
    aggregateTimeout: 0,
  },
};

export default config;
