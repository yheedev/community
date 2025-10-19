const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.alias = {
  "@": path.resolve(__dirname),
  "@assets": __dirname + "/assets",
  "@components": __dirname + "/components",
  "@stores": __dirname + "/stores",
};

module.exports = config;

// const { getDefaultConfig } = require("expo/metro-config");
// const config = getDefaultConfig(__dirname);
// module.exports = config;
