
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias['@ckeditor/ckeditor5-build-classic'] = 
        '/ckeditor-5/build/ckeditor.js';
    }

    return config;
  },
};