const mongoose = require("mongoose")

const LanguagesSchema = mongoose.Schema({
  name: { type: String, required: true },
  categoryID: { type: mongoose.Schema.Types.ObjectId, required: true },
  availableRessources: [{
    ressource: { type: String },
    ressourceId: { type: mongoose.Schema.Types.ObjectId, required: true },
    typeOfRessource: { type: String, required: true }
  }],
  tags: { type: Array }
}, { versionKey: false })