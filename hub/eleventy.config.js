const path = require("path");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "shared/theme-hub.css": "theme.css" });
  eleventyConfig.addPassthroughCopy({ "shared/base.css": "shared-base.css" });
  eleventyConfig.addPassthroughCopy({ "shared/favicon/hub.svg": "favicon.svg" });

  return {
    dir: {
      input: "hub",
      includes: "../shared/_includes",
      output: "dist/hub"
    },
    serverOptions: {
      host: "0.0.0.0",
      port: 8081
    }
  };
};
