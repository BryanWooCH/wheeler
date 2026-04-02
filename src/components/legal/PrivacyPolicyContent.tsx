import * as React from "react";
import { Link, Stack, Typography } from "@mui/material";

const lastUpdated = "March 21, 2026";
const contactEmail = "your-email@example.com";

const PrivacyPolicyContent: React.FC = () => {
  return (
    <Stack spacing={2}>
      <Typography variant="body2" color="text.secondary">
        Last updated: {lastUpdated}
      </Typography>

      <Typography variant="body1" color="text.secondary">
        This Privacy Policy explains how Spin &amp; Pick ("we", "us", or "our")
        collects, uses, and protects information when you use this website.
      </Typography>

      <Typography variant="h6" component="h2" fontWeight={700}>
        1. Information We Collect
      </Typography>
      <Typography variant="body1" color="text.secondary">
        We may collect limited technical data automatically, such as IP address,
        browser type, device information, pages viewed, and usage events. We do
        not intentionally collect sensitive personal information through the
        wheel feature.
      </Typography>

      <Typography variant="h6" component="h2" fontWeight={700}>
        2. How We Use Information
      </Typography>
      <Typography variant="body1" color="text.secondary">
        We use data to operate the site, improve reliability and user
        experience, analyze traffic, prevent abuse, and support advertising
        features.
      </Typography>

      <Typography variant="h6" component="h2" fontWeight={700}>
        3. Cookies and Similar Technologies
      </Typography>
      <Typography variant="body1" color="text.secondary">
        This site may use cookies or similar technologies to remember
        preferences, measure performance, and deliver relevant content and ads.
      </Typography>

      <Typography variant="h6" component="h2" fontWeight={700}>
        4. Google AdSense and Third-Party Advertising
      </Typography>
      <Typography variant="body1" color="text.secondary">
        We may use Google AdSense and other third-party advertising services.
        Google and its partners may use cookies to serve ads based on your prior
        visits to this and other websites.
      </Typography>
      <Typography variant="body1" color="text.secondary">
        You can opt out of personalized advertising by visiting Google Ads
        Settings at{" "}
        <Link
          href="https://adssettings.google.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          adssettings.google.com
        </Link>
        . You can also learn more about opting out of many third-party ad
        vendors at{" "}
        <Link
          href="https://www.aboutads.info"
          target="_blank"
          rel="noopener noreferrer"
        >
          aboutads.info
        </Link>
        .
      </Typography>

      <Typography variant="h6" component="h2" fontWeight={700}>
        5. Data Retention
      </Typography>
      <Typography variant="body1" color="text.secondary">
        We keep information only as long as needed for site operations,
        analytics, legal obligations, and security purposes.
      </Typography>

      <Typography variant="h6" component="h2" fontWeight={700}>
        6. Your Privacy Rights
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Depending on your location, you may have rights to request access,
        correction, deletion, or restriction of personal data. To make a
        request, contact us using the email below.
      </Typography>

      <Typography variant="h6" component="h2" fontWeight={700}>
        7. Children&apos;s Privacy
      </Typography>
      <Typography variant="body1" color="text.secondary">
        This site is not directed to children under 13, and we do not knowingly
        collect personal information from children under 13.
      </Typography>

      <Typography variant="h6" component="h2" fontWeight={700}>
        8. Changes to This Policy
      </Typography>
      <Typography variant="body1" color="text.secondary">
        We may update this policy from time to time. We will post the revised
        version on this page with a new "Last updated" date.
      </Typography>

      <Typography variant="h6" component="h2" fontWeight={700}>
        9. Contact Us
      </Typography>
      <Typography variant="body1" color="text.secondary">
        If you have questions about this Privacy Policy, contact us at{" "}
        <Link href={`mailto:${contactEmail}`}>{contactEmail}</Link>.
      </Typography>
    </Stack>
  );
};

export default PrivacyPolicyContent;
