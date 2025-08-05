import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
   images: {
    domains: [
      'dgimg-1306779837.cos.ap-shanghai.myqcloud.com',
      'localhost',
    ],
  },
   eslint: {
    ignoreDuringBuilds: true, // 👈 关闭构建时的 ESLint 检查
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
}

export default nextConfig
