module.exports = function(req, res, next) {
  if (CONFIG[CONFIG.environment].sessions !== false) {
    res.locals.csrfToken = req.csrfToken();
  }

  next();
}
