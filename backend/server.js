require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const router = express.Router();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

// temporal cors bypass
const cors = require('cors'); 
app.use(cors({ origin: 'http://localhost:8000' }));

const { sequelize, Usuario } = require('./models/index');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const apiRoutes = require('./routes/api.routes');
app.use('/api', apiRoutes); 

const adminRoutes = require('./routes/admin.routes');
app.use('/admin', adminRoutes);

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