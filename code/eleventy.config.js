module.exports = function (eleventyConfig) {
  eleventyConfig.addGlobalData("site", { url: "https://code.moonweb.org" });
  eleventyConfig.addFilter("date", (d) => d.toISOString());
  eleventyConfig.addPassthroughCopy({ "shared/theme-code.css": "theme.css" });
  eleventyConfig.addPassthroughCopy({ "shared/base.css": "shared-base.css" });
  eleventyConfig.addPassthroughCopy({ "shared/favicon/code.svg": "favicon.svg" });
  eleventyConfig.addPassthroughCopy({ "code/robots.txt": "robots.txt" });

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
