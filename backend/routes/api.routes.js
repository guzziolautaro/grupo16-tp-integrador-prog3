const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api.controller');

router.get('/productos', apiController.getProductosActivos);

module.exports = router;