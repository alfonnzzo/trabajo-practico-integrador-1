import { verifyToken } from '../helpers/jwt.js';
import  User  from '../models/user.model.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const payload = verifyToken(token);
    const user = await User.findByPk(payload.id);
    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};