const countries = require("../models/countries.models");

exports.findAll = async (req, res, next) => {
  countries.find()
    .then(country => res.status(200).json(country))
    .catch((error) => res.status(400).json({ error }));
};

exports.create = async (req, res, next) => {
  delete req.body.id;
  const country = new countries({
    ...req.body
  });
  country.save()
    .then(() => res.status(201).json({ message: 'The object has been stored' }))
    .catch((error) => res.status(400).json({ error }));
};