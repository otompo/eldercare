module.exports = {
  reactStrictMode: true,
  env: {
    DB_URL:
      "mongodb+srv://sasco:17NwweNoVh2dh5Rp@cluster0.qnoaijy.mongodb.net/eldercaredb?retryWrites=true&w=majority",
    DB_LOCAL: "mongodb://localhost:27017/eldercaredb",
    JWT_SECRET: "sfskftsfdssdsp34050eeie59o53H530smdslf",
    CLOUDINARY_API_SECRET: "3XTliwBlg5oYWFIIbfXWByvEQw0",
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};
