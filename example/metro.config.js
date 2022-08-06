/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 */

const path = require('path');
const exclusionList = require('metro-config/src/defaults/exclusionList');
const escape = require('escape-string-regexp');
const pak = require('../package.json');
const root = path.resolve(__dirname, '..');

const modules = Object.keys({
  ...pak.peerDependencies,
});

module.exports = {
  projectRoot: __dirname,
  // quick workaround for another issue with symlinks
  watchFolders: [path.resolve(__dirname, '.'), root],
  // workaround for an issue with symlinks encountered starting with
  // metro@0.55 / React Native 0.61
  // (not needed with React Native 0.60 / metro@0.54)
  // resolver: {
  //   extraNodeModules: new Proxy(
  //     {},
  //     {get: (_, name) => path.resolve('.', 'node_modules', name)},
  //   ),
  // },

  // We need to make sure that only one version is loaded for peerDependencies
  // So we blacklist them at the root, and alias them to the versions in example's node_modules
  resolver: {
    blacklistRE: exclusionList(
      modules.map(
        m => new RegExp(`^${escape(path.join(root, 'node_modules', m))}\\/.*$`),
      ),
    ),
    // extraNodeModules: new Proxy(
    //   {},
    //   {get: (_, name) => path.resolve('.', 'node_modules', name)},
    // ),

    extraNodeModules: modules.reduce((acc, name) => {
      acc[name] = path.join(__dirname, 'node_modules', name);
      return acc;
    }, {}),
  },

  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
