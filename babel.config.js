module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      //       "nativewind/babel",
      //       "expo-router/babel",
      "react-native-reanimated/plugin",
      //       // [
      //       //   "module-resolver",
      //       //   {
      //       //     alias: { "@": "./", "@assets": "./assets", "@components": "./components", "@stores": "./stores" },
      //       //     extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
      //       //   },
      //       // ],
    ],
  };
};
