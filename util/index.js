'use strict';
const files = requireContext(__dirname, false, /util\.js$/);
const modules = {};
files.keys().forEach((key) => {
  modules[key.replace(/(\.\/|.util\.js)/g, '')] = files(`../util/${key}`);
});

module.exports = modules;
