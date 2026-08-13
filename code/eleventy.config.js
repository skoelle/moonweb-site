const path = require("path");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "shared/theme-code.css": "theme.css" });
  eleventyConfig.addPassthroughCopy({ "shared/base.css": "shared-base.css" });
  eleventyConfig.addPassthroughCopy({ "shared/favicon/code.svg": "favicon.svg" });

  return {
    dir: {
      input: "code",
      includes: "../shared/_includes",
      output: "dist/code"
    },
    serverOptions: {
      host: "0.0.0.0",
      port: 8084
    }
  };
};
