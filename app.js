require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const router = require('./routes/index');

const { PORT = 3000 } = process.env;
const app = express();
const { errors } = require("celebrate");
const errorHandler = require('./middlewares/err');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(router);

mongoose.connect('mongodb://127.0.0.1/mestodb', {
  useNewUrlParser: true,
})
  .then(() => console.log('база подключена'))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

app.use(errors());
app.use(errorHandler);