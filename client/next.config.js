module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias['@ckeditor/ckeditor5-build-classic'] = 
        '/ckeditor-5/build/ckeditor.js';
    }

    return config;
  },
};