/** @type {import('next').NextConfig} */
const withBundleAnalyzer=require("@next/bundle-analyzer")({
  enabled:process.env.ANALYZE==="true"
})

const nextConfig = withBundleAnalyzer({
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains:["res.cloudinary.com","images.unsplash.com"]
  }
})

module.exports = nextConfig
