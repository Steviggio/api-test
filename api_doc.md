# API RESTful basic requests : 

  Here is a basic set of requests to initialize a CRUD request system for an API :

  ``` js
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
      await countries.updateOne({ _id: req.params.id }, {...req.body, _id: req.params.id})
        .then(() => res.status(200).json({ message: "The country has been successfully updated !" }))
        .catch((error) => res.status(400).json({ error }))
    }
  ```

### Usual practices to config the api models / controllers / routes and set a route used by the app :

  First step is to set a schema for your datas. Your functions defined in your controllers will have to match the prerequisites of this schema to make a valid request to your api.

  To create a data schema with Express.js, i'm specifically using the mongoose ODM(Object Document Mapper) as i use a MongoDB database.

  Here's my schema :

  Data's schema model : 

  ```js 
  const mongoose = require("mongoose");

  const CountriesSchema = mongoose.Schema({
    name: { type: String, required: true },
    capital: { type: String, required: true },
    citiesNumber: { type: Number, required: true },
    flagUrl: { type: String },
    officialLanguage: { type: String, required: true }
  }, { versionKey: false });

  module.exports = mongoose.model("Country", CountriesSchema);
  ```

  When your schema has been set, you can create functions in your controller to manipulate the datas in your requests so it can be stored inside your database.

  ## Controller file configuration :

  In your controller, the first step is to import the data schema in your file so it can be used within your functions :

  ```js
  const countries = require("../models/countries.models");
  ```

### 

  Each functions will be directly exported to configure specific routes for each requests. Here is a list of examples for each requests inside a controller file :

  POST request : 

  ``` js
  exports.create = async (req, res, next) => {
  delete req.body.id;
  const country = new countries({
    ...req.body
  });
  await country.save()
    .then(() => res.status(201).json({ message: 'The object has been stored.' }))
    .catch((error) => res.status(400).json({ error }));
  };
  ```

  GET request : 

  ```js
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
  ```

  PUT (Update) request : 

  ```js 
  exports.modify = async (req, res) => {
  await countries.updateOne({ _id: req.params.id }, {...req.body, _id: req.params.id})
    .then(() => res.status(200).json({ message: "The country has been successfully updated !" }))
    .catch((error) => res.status(400).json({ error }))
  }
  ```

  DELETE request : 

  ``` js 
  exports.delete = async (req, res) => {
  await countries.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "The country has been deleted successfully !" }))
    .catch((error) => res.status(400).json({ error }))
  }
  ```