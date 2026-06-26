module.exports = (req, res, next) => {
  const { nombre, categoria, precio } = req.body;
  if (!nombre || !categoria || precio === undefined || isNaN(parseFloat(precio))) {
    return res.status(400).json({ status: "error", mensaje: "Datos de producto invalidos" });
  }
  next();
};