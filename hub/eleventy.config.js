module.exports = function (eleventyConfig) {
  eleventyConfig.addGlobalData("site", { url: "https://www.moonweb.org" });
  eleventyConfig.addFilter("date", (d) => d.toISOString());
  eleventyConfig.addPassthroughCopy({ "shared/theme-hub.css": "theme.css" });
  eleventyConfig.addPassthroughCopy({ "shared/base.css": "shared-base.css" });
  eleventyConfig.addPassthroughCopy({ "shared/favicon/hub.svg": "favicon.svg" });
  eleventyConfig.addPassthroughCopy({ "hub/robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ "hub/stefan-koelle-foto.jpg": "stefan-koelle-foto.jpg" });

  // Old www.moonweb.org redirects (root-level HTML shortcuts)
  // .htm files are excluded from Eleventy processing, renamed to .html on output
  eleventyConfig.addPassthroughCopy({ "hub/start.htm": "start.html" });
  eleventyConfig.addPassthroughCopy({ "hub/index2.htm": "index2.html" });
  eleventyConfig.addPassthroughCopy({ "hub/index3.htm": "index3.html" });
  eleventyConfig.addPassthroughCopy({ "hub/new.htm": "new.html" });
  eleventyConfig.addPassthroughCopy({ "hub/links.htm": "links.html" });
  eleventyConfig.addPassthroughCopy({ "hub/infos.htm": "infos.html" });
  eleventyConfig.addPassthroughCopy({ "hub/hardware.htm": "hardware.html" });
  eleventyConfig.addPassthroughCopy({ "hub/users.htm": "users.html" });

  // Old www.moonweb.org redirects (content subdirectories)
  // .htm files are excluded from Eleventy processing, renamed to .html on output
  eleventyConfig.addPassthroughCopy({ "hub/beginning/index.htm": "beginning/index.html" });
  eleventyConfig.addPassthroughCopy({ "hub/projects/index.htm": "projects/index.html" });
  eleventyConfig.addPassthroughCopy({ "hub/products/index.htm": "products/index.html" });
  eleventyConfig.addPassthroughCopy({ "hub/acoustics/index.htm": "acoustics/index.html" });
  eleventyConfig.addPassthroughCopy({ "hub/location/index.htm": "location/index.html" });
  eleventyConfig.addPassthroughCopy({ "hub/background/index.htm": "background/index.html" });
  eleventyConfig.addPassthroughCopy({ "hub/partners/index.htm": "partners/index.html" });
  eleventyConfig.addPassthroughCopy({ "hub/contact/index.htm": "contact/index.html" });
  eleventyConfig.addPassthroughCopy({ "hub/network/index.htm": "network/index.html" });
  eleventyConfig.addPassthroughCopy({ "hub/stefan/index.htm": "stefan/index.html" });
  eleventyConfig.addPassthroughCopy({ "hub/legal-notice/index.htm": "legal-notice/index.html" });

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
