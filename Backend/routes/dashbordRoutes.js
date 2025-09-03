const express = require('express');

const{getDashbordData} = require('../controllers/dashBodrdController')
const {protect} = require('../middleware/authMiddleware')

const router = express.Router();


router.get("/", protect, getDashbordData);

module.exports = router;