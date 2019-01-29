// useful links:
// https://github.com/developit/preact-cli/issues/578
// https://github.com/pluscubed/preact-cli-plugin-fast-async
// https://github.com/developit/preact-cli/pull/617
export default (config, env) => {
  if (env.isProd) {
    // Make async work
    const babel = config.module.loaders.filter(
      loader => loader.loader === 'babel-loader',
    )[0].options;
    // Blacklist regenerator within env preset:
    babel.presets[0][1].exclude.push('transform-async-to-generator');
    // Add fast-async
    babel.plugins.push([require.resolve('fast-async'), { spec: true }]);
  }
};
