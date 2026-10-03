/**
 * Role guard placeholder.
 *
 * The prototype sends the active demo role in an `x-demo-role` header.
 * With Supabase Auth this becomes JWT verification + a profile lookup, and
 * Row-Level Security enforces the same rules at the database layer.
 */
const { HttpError } = require('./errorHandler');

function requireRole(...roles) {
  return (req, _res, next) => {
    const role = req.get('x-demo-role') || 'student';
    req.role = role;
    if (roles.length && !roles.includes(role)) {
      return next(new HttpError(403, `Role '${role}' is not allowed to perform this action`));
    }
    next();
  };
}

module.exports = { requireRole };
