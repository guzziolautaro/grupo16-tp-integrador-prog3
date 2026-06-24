require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const router = express.Router();

const { sequelize, Usuario } = require('./models/index');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const apiController = require('./controllers/api.controller');

router.get('/', apiController.getProductos);

app.use('/api', router);

sequelize.sync({ alter: true })
    .then(async () => {
        console.log("MySQL Database Tables synchronized successfully");
        
        //test: remove when no longer needed
        const defaultAdmin = await Usuario.findOne({ where: { email: 'admin@autoservicio.com' } });
        if (!defaultAdmin) {
            await Usuario.create({ 
                email: 'admin@autoservicio.com', 
                password: 'admin1234'
            });
            console.log("Test account generated: admin@autoservicio.com / admin1234");
        }

        app.listen(PORT, () => {
            console.log(`Server running successfully on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error("Critical database synchronization collapse:", err);
    });