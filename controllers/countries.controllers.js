const countries = require("../models/countries.models");

exports.findAll = async (req, res, next) => {
  await countries.find()
    .then(country => res.status(200).json(country))
    .catch((error) => res.status(400).json({ error }));
};

exports.findOne = async (req, res) => {
  await countries.findOne({ _id: req.params.id })
    .then(country => res.status(200).json(country))
    .catch((error) => res.status(400).json({ error }))
}

exports.create = async (req, res, next) => {
  delete req.body.id;
  const country = new countries({
    ...req.body
  });
  await country.save()
    .then(() => res.status(201).json({ message: 'The object has been stored.' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.delete = async (req, res) => {
  await countries.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "The country has been deleted successfully !" }))
    .catch((error) => res.status(400).json({ error }))
}

exports.modify = async (req, res) => {
  await countries.updateOne({ _id: req.params.id }, ...req.body)
    .then(() => res.status(200).json({ message: "The country has been successfully updated !" }))
    .catch((error) => res.status(400).json({ error }))
}

