const express = require('express');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb');
app.listen(3000, () => {
  console.log('Ok');
});
