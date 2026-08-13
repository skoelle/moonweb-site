const path = require("path");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "shared/theme-smarthome.css": "theme.css" });
  eleventyConfig.addPassthroughCopy({ "shared/base.css": "shared-base.css" });
  eleventyConfig.addPassthroughCopy({ "shared/favicon/smarthome.svg": "favicon.svg" });

  return {
    dir: {
      input: "smarthome",
      includes: "../shared/_includes",
      output: "dist/smarthome"
    },
    serverOptions: {
      host: "0.0.0.0",
      port: 8083
    }
  };
};
