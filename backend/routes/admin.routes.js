const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' }); 

router.get('/dashboard', adminController.getDashboard);
router.post('/producto/nuevo', upload.single('imagen'), adminController.postAddProduct);

module.exports = router;