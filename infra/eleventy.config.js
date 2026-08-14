module.exports = function (eleventyConfig) {
  eleventyConfig.addGlobalData("site", { url: "https://infra.moonweb.org" });
  eleventyConfig.addFilter("date", (d) => d.toISOString());
  eleventyConfig.addPassthroughCopy({ "shared/theme-infra.css": "theme.css" });
  eleventyConfig.addPassthroughCopy({ "shared/base.css": "shared-base.css" });
  eleventyConfig.addPassthroughCopy({ "shared/favicon/infra.svg": "favicon.svg" });
  eleventyConfig.addPassthroughCopy({ "infra/robots.txt": "robots.txt" });

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
