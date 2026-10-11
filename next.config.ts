import type { NextConfig } from "next";

// The five Camp funnel case studies were consolidated into one.
const campSlugs = ["camp-hb", "camp-whittier", "camp-hb-6week", "camp-whittier-6week", "camp-hb-rejoin"];

const nextConfig: NextConfig = {
  // Preserve every URL from the static site — case studies are linked from
  // LinkedIn posts, the résumé and emails that have already gone out.
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/about.html", destination: "/about", permanent: true },
      { source: "/resources.html", destination: "/resources", permanent: true },
      ...campSlugs.flatMap((slug) => [
        { source: `/work/${slug}.html`, destination: "/work/campaign-engine", permanent: true },
        { source: `/work/${slug}`, destination: "/work/campaign-engine", permanent: true },
      ]),
      { source: "/work/:slug.html", destination: "/work/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
