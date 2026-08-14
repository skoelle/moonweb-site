module.exports = function (eleventyConfig) {
  eleventyConfig.addGlobalData("site", { url: "https://retro.moonweb.org" });
  eleventyConfig.addFilter("date", (d) => d.toISOString());
  eleventyConfig.addPassthroughCopy({ "shared/theme-retro.css": "theme.css" });
  eleventyConfig.addPassthroughCopy({ "shared/base.css": "shared-base.css" });
  eleventyConfig.addPassthroughCopy({ "shared/favicon/retro.svg": "favicon.svg" });
  eleventyConfig.addPassthroughCopy({ "retro/robots.txt": "robots.txt" });

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
