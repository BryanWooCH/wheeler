import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import LegalPageLayout from "../components/legal/LegalPageLayout";
import PrivacyPolicyContent from "../components/legal/PrivacyPolicyContent";
import Seo from "../components/Seo";

const PrivacyPolicyPage: React.FC<PageProps> = () => {
  return (
    <LegalPageLayout title="Privacy Policy">
      <PrivacyPolicyContent />
    </LegalPageLayout>
  );
};

export default PrivacyPolicyPage;

export const Head: HeadFC = () => (
  <Seo
    title="Privacy Policy"
    description="Read how Spin & Pick collects, uses, and protects your information."
    pathname="/privacy-policy/"
    type="article"
  />
);
