const express = require("express"); 
const router = express.Router();
const countriesControllers = require("../controllers/countries.controllers");


router.get("/", countriesControllers.findAll);
router.post('/', countriesControllers.create);

module.exports = router;