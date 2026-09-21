import type { MetadataRoute } from "next"

const routes = [
  "/",
  "/about",
  "/ai-chat",
  "/ai-recommendations",
  "/categories",
  "/collections",
  "/corporate",
  "/custom-printing",
  "/occasions",
  "/products",
  "/recipients",
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://giftbasket.vercel.app"
  const lastModified = new Date()

  return routes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }))
}
