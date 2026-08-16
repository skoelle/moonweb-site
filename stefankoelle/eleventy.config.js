module.exports = function (eleventyConfig) {
  eleventyConfig.addGlobalData("site", { url: "https://stefankoelle.de" });
  eleventyConfig.addFilter("date", (d) => d.toISOString());
  eleventyConfig.addPassthroughCopy({ "stefankoelle/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "stefankoelle/ledmatrix/assets": "ledmatrix/assets" });
  eleventyConfig.addPassthroughCopy({ "stefankoelle/robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ "stefankoelle/.htaccess": ".htaccess" });
  eleventyConfig.addPassthroughCopy({ "stefankoelle/pdf/cv.pdf": "pdf/cv.pdf" });
  eleventyConfig.addPassthroughCopy({ "shared/base.css": "shared-base.css" });
  eleventyConfig.addPassthroughCopy({ "shared/theme-hub.css": "theme.css" });
  eleventyConfig.addPassthroughCopy({ "shared/favicon/hub.svg": "favicon.svg" });

  return {
    dir: {
      input: "stefankoelle",
      includes: "_includes",
      output: "dist/stefankoelle"
    },
    serverOptions: {
      host: "0.0.0.0",
      port: 8086
    }
  };
};
