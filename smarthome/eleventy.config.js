module.exports = function (eleventyConfig) {
  eleventyConfig.addGlobalData("site", { url: "https://smarthome.moonweb.org" });
  eleventyConfig.addFilter("date", (d) => d.toISOString());
  eleventyConfig.addPassthroughCopy({ "shared/theme-smarthome.css": "theme.css" });
  eleventyConfig.addPassthroughCopy({ "shared/base.css": "shared-base.css" });
  eleventyConfig.addPassthroughCopy({ "shared/favicon/smarthome.svg": "favicon.svg" });
  eleventyConfig.addPassthroughCopy({ "smarthome/robots.txt": "robots.txt" });

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
