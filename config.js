require('dotenv').config();

const { JWT_SECRET, MONGO_URL, NODE_ENV } = process.env;

module.exports = {
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'JWT_SECRET',
  MONGO_URL:
    NODE_ENV === 'production'
      ? MONGO_URL
      : 'mongodb://localhost:27017/moviesdb',
};

// 'e3cd37b056ab40c1b26c66c00d48e156'
