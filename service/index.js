'use strict';
const files = requireContext(__dirname, false, /service\.js$/);
const modules = {};
files.keys().forEach((key) => {
  modules[key.replace(/(\.\/|.service\.js)/g, '')] = files(`../service/${key}`);
});

module.exports = modules;
