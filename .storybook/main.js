const path = require("path"); // used for resolving aliases

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
  ],
  // add this function to tweak the webpack config
  webpackFinal: async (config, { configType }) => {
    // so I can import { storyFactory } from '~storybook/util/helpers'
    config.resolve.alias["~storybook"] = path.resolve(__dirname);
    // the @ alias points to the <code>src/</code> directory, a common alias
    // used in the Vue community
    config.resolve.alias["@"] = path.resolve(__dirname, "..", "src");

    // THIS is the tricky stuff!
    config.module.rules.push({
      test: /\.s[ac]ss$/,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            esModule: false,
          },
        },
        {
          loader: "sass-loader",
          options: {
            sassOptions: {
              indentedSyntax: false,
            },
            prependData: "@import '@/scss/variables.scss';",
          },
        },
      ],
      include: path.resolve(__dirname, "../"),
    });

    // return the updated Storybook configuration
    return config;
  },
};
