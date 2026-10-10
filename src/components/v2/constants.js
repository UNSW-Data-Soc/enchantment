export const navbar = [
  {
    text: "Who We Are",
    linkto: "v2/who-we-are",
    fallback: "/who-we-are/",
  },
  {
    text: "Meet the Team",
    linkto: "v2/meet-the-team",
    fallback: "/meet-the-team/",
  },
  {
    text: "Events",
    linkto: "v2/events",
    fallback: "/updates/",
  },
  {
    text: "Sponsorships",
    linkto: "v2/sponsorships",
    fallback: "/sponsorships/",
  },
  {
    text: "Publications",
    linkto: "v2/publications",
    fallback: "/publication/",
  },
  {
    text: "Contact Us",
    linkto: "v2/contact-us",
    fallback: "/contact/",
  },
];

export const quicklinks = navbar.filter(({ linkto }) => linkto !== "v2/who-we-are");
