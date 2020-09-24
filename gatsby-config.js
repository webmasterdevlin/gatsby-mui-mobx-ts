// Load environment file.
// See: https://www.gatsbyjs.org/docs/environment-variables/
// Cannot use NODE_ENV since it's always set to production when we call `gatsby build`,
// that's why we use ACTIVE_ENV.

const activeEnv = process.env.ACTIVE_ENV || 'local';
require('dotenv').config({
  path: `.env.${activeEnv}`,
});

console.log('Using environment', activeEnv);

module.exports = {
  siteMetadata: {
    title: '',
    description: '',
    image: '',
    author: '',
    url: '',
    endpoint: "",
  },
  plugins: [
    'gatsby-plugin-top-layout',
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        stylesProvider: {
          injectFirst: true,
        },
      },
    },
    'gatsby-transformer-typescript-css-modules',
    'gatsby-plugin-typescript',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#99c93c',
        theme_color: '#99c93c',
        display: 'minimal-ui',
        icon: 'static/favicon.ico', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-web-font-loader',
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Roboto', 'sans-serif'],
        },
      },
    },
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: '',

        // Include GTM in development.
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false,

        // datalayer to be set before GTM is loaded
        // should be an object or a function that is executed in the browser
        // Defaults to null
        defaultDataLayer: { platform: 'gatsby' },
      },
    },
    {
      resolve: 'gatsby-plugin-polyfill-io',
      options: {
        features: [
          'fetch',
          'Element.prototype.classList',
          'Array.prototype.find',
          'Element.prototype.cloneNode',
          'Object.values',
          'Object.entries',
        ],
      },
    },
    'gatsby-plugin-react-helmet',
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
