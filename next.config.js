module.exports = {
  reactStrictMode: true,
  env: {
    DB_URL:
      "mongodb+srv://eben:2f3QzIJP1mMk2PJB@cluster0.ki1jfut.mongodb.net/eldercaredb?retryWrites=true&w=majority",
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
