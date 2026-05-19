export default function sitemap() {
  return [
    {
      url: "https://perfectshine-krakow.pl",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://perfectshine-krakow.pl/order",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://perfectshine-krakow.pl/calculator",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}