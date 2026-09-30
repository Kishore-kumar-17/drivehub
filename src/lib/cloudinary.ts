/**
 * Cloudinary & High Performance Image Pipeline Helper
 */
export function getOptimizedImageUrl(
  url: string,
  options: {
    width?: number;
    height?: number;
    quality?: number | "auto";
    format?: "auto" | "webp" | "avif";
  } = {}
): string {
  if (!url) return "/placeholder-car.jpg";

  // If already a Cloudinary image
  if (url.includes("res.cloudinary.com")) {
    const transformations: string[] = [];
    if (options.width) transformations.push(`w_${options.width}`);
    if (options.height) transformations.push(`h_${options.height}`);
    transformations.push(`c_fill`);
    transformations.push(`q_${options.quality || "auto"}`);
    transformations.push(`f_${options.format || "auto"}`);

    const parts = url.split("/upload/");
    if (parts.length === 2) {
      return `${parts[0]}/upload/${transformations.join(",")}/${parts[1]}`;
    }
  }

  // If Unsplash image
  if (url.includes("images.unsplash.com")) {
    const base = url.split("?")[0];
    const params = new URLSearchParams();
    params.set("auto", "format");
    params.set("fit", "crop");
    params.set("q", options.quality ? String(options.quality) : "80");
    if (options.width) params.set("w", String(options.width));
    if (options.height) params.set("h", String(options.height));
    return `${base}?${params.toString()}`;
  }

  return url;
}
