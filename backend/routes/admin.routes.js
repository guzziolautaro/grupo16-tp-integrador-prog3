const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' }); 

router.get('/dashboard', adminController.getDashboard);
router.post('/product/new', upload.single('image'), adminController.postAddProduct);

router.put('/product/toggle/:id', adminController.postToggleProduct);
router.put('/product/edit/:id', upload.single('image'), adminController.postEditProduct);

router.delete('/product/delete/:id', adminController.postDeleteProduct);

module.exports = router;