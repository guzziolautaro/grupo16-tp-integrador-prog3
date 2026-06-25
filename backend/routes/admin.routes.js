const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' }); 

router.get('/dashboard', adminController.getDashboard);
router.post('/producto/nuevo', upload.single('imagen'), adminController.postAddProduct);

router.put('/producto/toggle/:id', adminController.postToggleProducto);
router.delete('/producto/eliminar/:id', adminController.postEliminarProducto);

module.exports = router;