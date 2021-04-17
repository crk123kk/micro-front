// webpack 打包配置
module.exports = {
  configureWebpack: {
    output: {
      library: 'singleVue',
      libraryTarget: 'umd',
    },
    devServer: {
      port: 10000,
    },
  },
};
