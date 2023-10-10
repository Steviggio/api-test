const express = require('express');
const router = express.Router(); 
const languagesControllers = require("../controllers/languages.controllers")


router.post("/", languagesControllers.create);
// router.get("/");

// router.put();
// router.delete();


module.exports = router; 