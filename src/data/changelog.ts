export type ChangelogEntry = {
  version: string;
  date: string;
  items: string[];
};

export const changelogEntries: ChangelogEntry[] = [
  {
    version: "v1.3.0",
    date: "2026-03-21",
    items: [
      "Added Privacy Policy page for ad review readiness.",
      "Added Changelog page to track product updates.",
      "Added footer links for policy and release notes.",
    ],
  },
  {
    version: "v1.2.0",
    date: "2026-03-05",
    items: [
      "Improved mobile responsiveness and prevented horizontal overflow.",
      "Fixed wheel shape consistency to keep a proper circle on small screens.",
      "Adjusted winner alignment for more accurate visual selection.",
    ],
  },
  {
    version: "v1.1.0",
    date: "2026-03-04",
    items: [
      "Added celebration modal with confetti and fireworks effects.",
      "Added shuffle action for option input.",
      "Enhanced wheel interaction with breaker pins and flapper behavior.",
    ],
  },
  {
    version: "v1.0.0",
    date: "2026-03-03",
    items: [
      "Initial public release of Spin & Pick wheel app.",
      "Created wheel and input experience with Gatsby + TypeScript.",
      "Integrated MUI and styled-components theme setup.",
    ],
  },
];
