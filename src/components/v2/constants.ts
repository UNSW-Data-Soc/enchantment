export const subpages = [
  {
    labelKey: 'nav.meetTeam',
    linkto: "v2/meet-the-team",
    fallback: "/meet-the-team/",
  },
  {
    labelKey: 'nav.events',
    linkto: "v2/events",
    fallback: "/updates/",
  },
  {
    labelKey: 'nav.sponsorships',
    linkto: "v2/sponsorships",
    fallback: "/sponsorships/",
  },
  {
    labelKey: 'nav.publications',
    linkto: "v2/publications",
    fallback: "/publication/",
  },
  {
    labelKey: 'nav.contact',
    linkto: "v2/contact-us",
    fallback: "/contact/",
  },
] as const;

export const quicklinks = subpages;
