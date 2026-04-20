import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import ChangelogContent from "../components/legal/ChangelogContent";
import LegalPageLayout from "../components/legal/LegalPageLayout";
import Seo from "../components/Seo";

const ChangelogPage: React.FC<PageProps> = () => {
  return (
    <LegalPageLayout
      title="Changelog"
      subtitle="Product updates for Spin & Pick."
    >
      <ChangelogContent />
    </LegalPageLayout>
  );
};

export default ChangelogPage;

export const Head: HeadFC = () => (
  <Seo
    title="Changelog"
    description="Track product updates, improvements, and fixes for Spin & Pick."
    pathname="/changelog/"
    type="article"
  />
);
