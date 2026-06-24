const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false
    }
);
const Producto = sequelize.define('Producto', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    categoria: { type: DataTypes.STRING, allowNull: false },
    precio: { type: DataTypes.FLOAT, allowNull: false },
    imagen: { type: DataTypes.STRING, allowNull: false },
    activo: { type: DataTypes.BOOLEAN, defaultValue: true }
});

const Usuario = sequelize.define('Usuario', {
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false }
});

const Venta = sequelize.define('Venta', {
    nombreCliente: { type: DataTypes.STRING, allowNull: false },
    fecha: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
    total: { type: DataTypes.FLOAT, allowNull: false }
});

const DetalleVenta = sequelize.define('DetalleVenta', {
    cantidad: { type: DataTypes.INTEGER, defaultValue: 1 },
    precioUnitario: { type: DataTypes.FLOAT, allowNull: false },
    ProductoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Productos', 
            key: 'id'
        }
    },
    VentaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Venta',
            key: 'id'
        }
    }

});

Producto.belongsToMany(Venta, { through: DetalleVenta, foreignKey: 'ProductoId' });
Venta.belongsToMany(Producto, { through: DetalleVenta, foreignKey: 'VentaId' });

module.exports = { sequelize, Producto, Usuario, Venta, DetalleVenta };