const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// 웹 전용 설정
config.resolver.sourceExts = ['tsx', 'ts', 'jsx', 'js', 'json'];
config.resolver.assetExts = config.resolver.assetExts.filter((ext) => ext !== 'svg');

// import.meta 문제 해결 시도
config.transformer = {
  ...config.transformer,
  getTransformOptions: async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: true,
    },
  }),
};

module.exports = config;

// const config = getDefaultConfig(__dirname);

// config.resolver.unstable_enablePackageExports = true;

// config.resolver.resolveRequest = (context, moduleName, platform) => {
//   if (moduleName === 'zustand' || moduleName.startsWith('zustand/')) {
//     //? Resolve to its CommonJS entry (fallback to main/index.js)
//     return {
//       type: 'sourceFile',
//       //? require.resolve will pick up the CJS entry (index.js) since "exports" is bypassed
//       filePath: require.resolve(moduleName),
//     };
//   }

//   return context.resolveRequest(context, moduleName, platform);
// };

// module.exports = config;
