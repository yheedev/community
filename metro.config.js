const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const config = getDefaultConfig(__dirname);

config.resolver.unstable_enablePackageExports = true;
config.resolver.sourceExts = [...config.resolver.sourceExts, "cjs", "mjs"];

config.resolver.alias = {
  "@": path.resolve(__dirname),
  "@assets": path.resolve(__dirname, "assets"),
  "@components": path.resolve(__dirname, "components"),
  "@stores": path.resolve(__dirname, "stores"),
};

module.exports = config;
