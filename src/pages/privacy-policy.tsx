import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import LegalPageLayout from "../components/legal/LegalPageLayout";
import PrivacyPolicyContent from "../components/legal/PrivacyPolicyContent";

const PrivacyPolicyPage: React.FC<PageProps> = () => {
  return (
    <LegalPageLayout title="Privacy Policy">
      <PrivacyPolicyContent />
    </LegalPageLayout>
  );
};

export default PrivacyPolicyPage;

export const Head: HeadFC = () => <title>Privacy Policy | Spin & Pick</title>;
