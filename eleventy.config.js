const SITES = {
  hub: { pathPrefix: "" },
  infra: { pathPrefix: "/infra" },
  smarthome: { pathPrefix: "/smarthome" },
  code: { pathPrefix: "/code" },
  retro: { pathPrefix: "/retro" },
};

module.exports = function (eleventyConfig) {
  eleventyConfig.addGlobalData("site", { url: "https://www.moonweb.org" });
  eleventyConfig.addFilter("date", (d) => d.toISOString());

  // Exclude the standalone sites from the root (moonweb) build
  eleventyConfig.ignores.add("stefankoelle/**");
  eleventyConfig.ignores.add("timecapsule/**");

  // Computed pathPrefix based on page's section front matter
  eleventyConfig.addGlobalData("eleventyComputed", {
    pathPrefix: (data) => SITES[data.section]?.pathPrefix ?? "",
  });

  // Per-section collections (for sitemaps)
  for (const section of Object.keys(SITES)) {
    eleventyConfig.addCollection(section, (collectionsApi) =>
      collectionsApi.getFilteredByTag(section)
    );
  }

  // --- Passthrough copies ---

  // Retro: Storm ST / Cloudy ST page images
  eleventyConfig.addPassthroughCopy("retro/storm-cloudy/*.jpg");

  // Retro: ET4000 page images
  eleventyConfig.addPassthroughCopy("retro/et4000-experiment/*.jpg");

  // Retro: STPSU page images + manual PDF
  eleventyConfig.addPassthroughCopy("retro/stpsu/*.pdf");

  // Retro: page-specific photo galleries (MonSTerBoard, Gotek, Eiffel, STPSU)
  eleventyConfig.addPassthroughCopy("retro/monsterboard/*.jpg");
  eleventyConfig.addPassthroughCopy("retro/gotek/*.jpg");
  eleventyConfig.addPassthroughCopy("retro/eiffel/*.jpg");
  eleventyConfig.addPassthroughCopy("retro/stpsu/*.jpg");
  eleventyConfig.addPassthroughCopy("retro/acsi2stm/*.jpg");
  eleventyConfig.addPassthroughCopy("retro/atari-vga/*.jpg");
  eleventyConfig.addPassthroughCopy("retro/laser-mouse/*.jpg");
  eleventyConfig.addPassthroughCopy("retro/mega-st-high/*.jpg");
  eleventyConfig.addPassthroughCopy("retro/mistery-core/*.jpg");

  // Root-level shared assets
  eleventyConfig.addPassthroughCopy({ "shared/base.css": "shared-base.css" });
  eleventyConfig.addPassthroughCopy({ "shared/favicon/hub.svg": "favicon.svg" });
  eleventyConfig.addPassthroughCopy({ "hub/robots.txt": "robots.txt" });

  // Per-section assets: favicon
  for (const [section, cfg] of Object.entries(SITES)) {
    const prefix = cfg.pathPrefix || ".";
    eleventyConfig.addPassthroughCopy({
      [`shared/favicon/${section}.svg`]: `${prefix}/favicon.svg`,
    });
  }

  // Hub: profile photo
  eleventyConfig.addPassthroughCopy({
    "hub/stefan-koelle-foto.jpg": "stefan-koelle-foto.jpg",
  });

  // Hub: old www.moonweb.org redirects (.htm → .html)
  const htmRedirects = [
    "start",
    "index2",
    "index3",
    "new",
    "links",
    "infos",
    "hardware",
    "users",
  ];
  for (const name of htmRedirects) {
    eleventyConfig.addPassthroughCopy({
      [`hub/${name}.htm`]: `${name}.html`,
    });
  }
  const htmSubdirs = [
    "beginning",
    "projects",
    "products",
    "acoustics",
    "location",
    "background",
    "partners",
    "contact",
    "network",
    "stefan",
    "legal-notice",
  ];
  for (const dir of htmSubdirs) {
    eleventyConfig.addPassthroughCopy({
      [`hub/${dir}/index.htm`]: `${dir}/index.html`,
    });
  }
  const beginningSubpages = ["news", "report", "sitemap"];
  for (const name of beginningSubpages) {
    eleventyConfig.addPassthroughCopy({
      [`hub/beginning/${name}.htm`]: `beginning/${name}.html`,
    });
  }

  return {
    dir: {
      input: ".",
      includes: "shared/_includes",
      output: "dist/moonweb",
    },
    serverOptions: {
      host: "0.0.0.0",
      port: 8081,
    },
  };
};
