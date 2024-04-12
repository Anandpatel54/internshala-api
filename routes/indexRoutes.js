const express = require("express");
const router = express.Router();
const {homepage} = require("../controllers/indexController")

//get/
router.get("/", homepage)

module.exports = router;
