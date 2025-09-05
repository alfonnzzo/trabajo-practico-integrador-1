export const ownerMiddleware = (getOwnerIdFromReq) => (req, res, next) => {
  const ownerId = getOwnerIdFromReq(req);
  if (req.user.role === 'admin' || req.user.id === ownerId) return next();
  return res.status(403).json({ message: 'Forbidden' });
};