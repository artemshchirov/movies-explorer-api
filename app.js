const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { routes } = require('./src/routes/index');
const { errorHandler } = require('./src/middlewares/errorHandler');
const {
  requestLogger,
  errorLogger,
  consoleLogger,
} = require('./src/middlewares/logger');
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
      console.log(`Connected to ${MONGO_URL}`);
    },
  );
} catch (err) {
  throw new Error(err.message);
}

app.use(consoleLogger);
app.use(requestLogger);
app.use(cors());
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(PORT);
console.log(`Server listen on ${PORT}`);
