import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: "Spin & Pick",
    description:
      "Spin a customizable decision wheel to quickly choose meals, tasks, teams, and more.",
    siteUrl: process.env.SITE_URL || "https://wheeler.vercel.app",
    image: "/social-preview.png",
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: ["gatsby-plugin-styled-components"],
};

export default config;
