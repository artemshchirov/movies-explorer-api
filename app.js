const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { routes } = require('./src/routes/index');
const { requestLogger, errorLogger } = require('./src/middlewares/logger');
const errorHandler = require('./src/middlewares/errorHandler');
const { MONGO_URL } = require('./config');
const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());

try {
  mongoose.connect(
    MONGO_URL,
    {
      useNewUrlParser: true,
      autoIndex: true,
    },
    (err) => {
      if (err) throw err;
      console.log('Connected to moviesdb');
    }
  );
} catch (err) {
  throw new Error(err.message);
}

app.use((req, res, next) => {
  console.log(`${req.method}: ${req.path} ${JSON.stringify(req.body)}`);
  next();
});
app.use(requestLogger);
app.use(cors());
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(PORT);
console.log(`Server listen on ${PORT}`);
