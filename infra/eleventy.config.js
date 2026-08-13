const path = require("path");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "shared/theme-infra.css": "theme.css" });
  eleventyConfig.addPassthroughCopy({ "shared/base.css": "shared-base.css" });
  eleventyConfig.addPassthroughCopy({ "shared/favicon/infra.svg": "favicon.svg" });

  return {
    dir: {
      input: "infra",
      includes: "../shared/_includes",
      output: "dist/infra"
    },
    serverOptions: {
      host: "0.0.0.0",
      port: 8082
    }
  };
};
