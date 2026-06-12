const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const apiController = require('./controllers/api.controller');

router.get('/', apiController.getProductos);

app.use('/api', router);
app.listen(PORT, () => {
    console.log(`running http://localhost:${PORT}`);
});