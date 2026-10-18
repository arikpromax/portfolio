import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Значок «N» у режимі розробки стоїть у лівому нижньому куті й перекриває кнопку «Про нас».
  // На живий сайт не впливає; помилки компіляції Next.js показує й без нього.
  devIndicators: false,
};

export default nextConfig;
