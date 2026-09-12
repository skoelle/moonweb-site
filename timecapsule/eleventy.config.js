const markdownIt = require("markdown-it");

const md = new markdownIt({ html: true, breaks: true });

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "assets": "/timecapsule/assets" });
  eleventyConfig.addPassthroughCopy({ ".htaccess": "/timecapsule/.htaccess" });

  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addFilter("toIsoDate", function(dateStr) {
    var parts = String(dateStr).split("/");
    if (parts.length === 3) {
      var m = parts[0].padStart(2, "0");
      var d = parts[1].padStart(2, "0");
      var y = parts[2].padStart(4, "0");
      return y + "-" + m + "-" + d;
    }
    return dateStr;
  });

  eleventyConfig.addPairedShortcode("pseudonymBox", function (content, title) {
    const body = md.render(content || "");
    return `<p align="right">
<table border="0" cellspacing="1" cellpadding="3" width="350" bgcolor="#555544" class="pseudonym-box">
<tr><td><font color="#CCAA66"><b>${title}</b></font></td></tr>
<tr><td bgcolor="#FFFFFF">${body}</td></tr>
</table>
</p>`;
  });

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
};
