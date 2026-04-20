import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";

type SeoProps = {
  title?: string;
  description?: string;
  pathname?: string;
  image?: string;
  noindex?: boolean;
  type?: "website" | "article";
};

type SiteMetadata = {
  title: string;
  description: string;
  siteUrl: string;
  image?: string;
};

type SiteQueryResult = {
  site: {
    siteMetadata: SiteMetadata;
  };
};

const isAbsoluteUrl = (value: string): boolean => /^https?:\/\//i.test(value);

const joinUrl = (base: string, value: string): string => {
  const normalizedBase = base.replace(/\/$/, "");
  const normalizedValue = value.startsWith("/") ? value : `/${value}`;
  return `${normalizedBase}${normalizedValue}`;
};

const resolveUrl = (siteUrl: string, value?: string): string | undefined => {
  if (!value) {
    return undefined;
  }

  return isAbsoluteUrl(value) ? value : joinUrl(siteUrl, value);
};

const normalizePathname = (value?: string): string => {
  if (!value || value === "/") {
    return "/";
  }

  return value.startsWith("/") ? value : `/${value}`;
};

const Seo: React.FC<SeoProps> = ({
  title,
  description,
  pathname,
  image,
  noindex = false,
  type = "website",
}) => {
  const data = useStaticQuery<SiteQueryResult>(graphql`
    query SeoSiteMetadata {
      site {
        siteMetadata {
          title
          description
          siteUrl
          image
        }
      }
    }
  `);

  const metadata = data.site.siteMetadata;
  const pageTitle = title ? `${title} | ${metadata.title}` : metadata.title;
  const pageDescription = description || metadata.description;
  const normalizedPathname = normalizePathname(pathname);
  const canonicalUrl = joinUrl(metadata.siteUrl, normalizedPathname);
  const socialImage = resolveUrl(metadata.siteUrl, image || metadata.image);

  return (
    <>
      <html lang="en" />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta
        name="robots"
        content={noindex ? "noindex, nofollow" : "index, follow"}
      />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={metadata.title} />
      {socialImage && <meta property="og:image" content={socialImage} />}
      {socialImage && <meta property="og:image:alt" content={pageTitle} />}
      {socialImage && <meta property="og:image:width" content="1200" />}
      {socialImage && <meta property="og:image:height" content="630" />}
      {socialImage && <meta property="og:image:type" content="image/png" />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      {socialImage && <meta name="twitter:image" content={socialImage} />}
      {socialImage && <meta name="twitter:image:alt" content={pageTitle} />}
    </>
  );
};

export default Seo;
