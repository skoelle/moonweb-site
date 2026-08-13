const path = require("path");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "shared/theme-retro.css": "theme.css" });
  eleventyConfig.addPassthroughCopy({ "shared/base.css": "shared-base.css" });
  eleventyConfig.addPassthroughCopy({ "shared/favicon/retro.svg": "favicon.svg" });

  return {
    dir: {
      input: "retro",
      includes: "../shared/_includes",
      output: "dist/retro"
    },
    serverOptions: {
      host: "0.0.0.0",
      port: 8085
    }
  };
};
