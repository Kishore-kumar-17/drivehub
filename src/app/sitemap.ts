import { MetadataRoute } from "next";
import { MOCK_CARS } from "@/data/cars";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://drivehubcars.com";

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/cars`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sell-your-car`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/finance`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Dynamic car detail routes
  const carRoutes: MetadataRoute.Sitemap = MOCK_CARS.map((car) => ({
    url: `${baseUrl}/cars/${car.slug}`,
    lastModified: new Date(car.createdAt),
    changeFrequency: "daily",
    priority: 0.85,
  }));

  return [...staticRoutes, ...carRoutes];
}
