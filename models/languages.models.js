const mongoose = require("mongoose")

const LanguagesSchema = mongoose.Schema({
  name: { type: String, required: true },
  numberOfNativeSpeakers: { type: Number, required: true },
  countriesOfficialLanguage: [{
    name: { type: String, required: true },
  }],
  availableRessources: [{
    ressourceName: { type: String },
    typeOfRessource: { type: String, required: true, enum: ["free", "premium"] }
  }],
  tags: { type: Array },
}, { versionKey: false })

module.exports = mongoose.model("Languages", LanguagesSchema)