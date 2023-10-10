const express = require("express");
require("dotenv").config();
const app = express();
const countriesRoutes = require("./routes/countries.routes");
const usersRoutes = require("./routes/users.routes");
const languagesRoutes = require('./routes/languages.routes');

// Connecting the app to the DB

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/Steviggio_db", options)
  .then(() => console.log('Successfully connected to the DB'))
  .catch(err => console.error("An error as occured when connecting to DB"))


// Creating one get request for countries
app.use(express.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
})

app.use("/country", countriesRoutes);
app.use('/', usersRoutes);
app.use("/language", languagesRoutes)



module.exports = app; 