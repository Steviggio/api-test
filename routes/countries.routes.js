const express = require("express"); 
const router = express.Router();
const countriesControllers = require("../controllers/countries.controllers");

// GET Requests
router.get("/", countriesControllers.findAll);
router.get('/:id', countriesControllers.findOne);

// POST Requests
router.post('/', countriesControllers.create);

// PUT Requests
router.put("/:id", countriesControllers.modify);

// DELETE Requests
router.delete("/:id", countriesControllers.delete);


module.exports = router;