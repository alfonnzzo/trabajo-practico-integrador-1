export const adminMiddleware = (req, res, next) => {
  try {
    if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  next();

  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' }); 
  }
};