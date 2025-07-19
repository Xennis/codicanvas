import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Otherwise ERR_REQUIRE_ESM happens https://github.com/airbnb/visx/issues/1637#issuecomment-1538160630
  transpilePackages: ["shiki"],
}
