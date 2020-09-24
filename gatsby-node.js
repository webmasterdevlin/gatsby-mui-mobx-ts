const path = require('path');

/**
 * @param args {CreateWebpackConfigArgs}
 */
exports.onCreateWebpackConfig = args => {
  const { stage, loaders, actions, ...other } = args;

  if (stage === 'build-html') {
    // See: https://github.com/gatsbyjs/gatsby/issues/6667#issuecomment-424548775
    actions.setWebpackConfig({
      module: {
        rules: [
          {
           
          },
        ],
      },
    });
  }

  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  });

  // Source maps should only be enabled when we are running locallyö
  const sourceMapsEnabled = process.env.ACTIVE_ENV === 'local';
  if (stage === 'build-javascript') {
    // Turn off source maps
    actions.setWebpackConfig({
      devtool: sourceMapsEnabled,
    });
  }
};
