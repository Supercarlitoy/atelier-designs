const config = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.chromatix.com.au",
        pathname: "/wp-content/uploads/**"
      },
      {
        protocol: "https",
        hostname: "assets-us-01.kc-usercontent.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "brandwell.com.au",
        pathname: "/wp-content/uploads/**"
      },
      {
        protocol: "https",
        hostname: "www.emotedigital.com.au",
        pathname: "/wp-content/uploads/**"
      },
      {
        protocol: "https",
        hostname: "a.storyblok.com",
        pathname: "/f/**"
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**"
      }
    ]
  }
};

export default config;
