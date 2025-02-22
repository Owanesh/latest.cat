module.exports = {
  stories: [
    "../components/*.stories.mdx",
    "../components/*.stories.@(js|jsx|ts|tsx)",
    "../components/**/story.mdx",
    "../components/**/story.@(js|jsx|ts|tsx)",
    "../components/**/*.stories.mdx",
    "../components/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-postcss",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
  staticDirs: ["../public"],
};
