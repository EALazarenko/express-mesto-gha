const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const routes = require('./routes/index');

const { PORT = 3000 } = process.env;
const app = express();
const { errors } = require("celebrate");

app.use(express.json());
app.use(errors());
app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1/mestodb', {
  useNewUrlParser: true,
})
  .then(() => console.log('база подключена'))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

app.use(express.urlencoded({ extended: true }));

/* app.use((req, res, next) => {
  req.user = {
    _id: '64441bfa323791240b2ad4c3',
  };

  next();
}); */

app.use(routes);
