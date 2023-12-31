const mongoose = require("mongoose");

const CountriesSchema = mongoose.Schema({
  name: { type: String, required: true },
  capital: { type: String, required: true },
  citiesNumber: { type: Number, required: true },
  flagUrl: { type: String },
  officialLanguage: [{
    name: { type: String, required: true },
  }]
}, { versionKey: false });

module.exports = mongoose.model("Country", CountriesSchema);