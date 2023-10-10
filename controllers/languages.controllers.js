const mongoose = require("mongoose");
const Languages = require("../models/languages.models");

exports.create = async (req, res, next) => {
  delete req.body.id;
  const language = new Languages({
    ...req.body
  })
  

  await language.save()
    .then(language => res.status(200).json("A new country has been added to the DB" , language))
    .catch(error => res.status(400).json("An error has occured", error))
}