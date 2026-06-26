const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const uploadMiddleware = require('../middlewares/upload.middleware');

const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' }); 

router.get('/dashboard', adminController.getDashboard);
router.post('/product/new',uploadMiddleware, adminController.postAddProduct);

router.post('/upload/:id', uploadMiddleware, adminController.postUploadImage);

router.put('/product/toggle/:id', adminController.postToggleProduct);
router.put('/product/edit/:id', uploadMiddleware, adminController.postEditProduct);

router.delete('/product/delete/:id', adminController.postDeleteProduct);

module.exports = router;