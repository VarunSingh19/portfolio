/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    // Performance optimizations
    experimental: {
        optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
        serverComponentsExternalPackages: ['@prisma/client'],
    },
    // Compression and caching
    compress: true,
    poweredByHeader: false,
    // Image optimizations
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**'
            }
        ],
        formats: ['image/webp', 'image/avif'],
        minimumCacheTTL: 60,
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
    // Bundle optimization
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
            };
        }
        return config;
    },
};

export default nextConfig;
