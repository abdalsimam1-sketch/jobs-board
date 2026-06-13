const { Forbidden } = require("../errors");

const requireRole = (role) => {
  return (req, res, next) => {
    if (req.user.role != role) {
      throw new Forbidden("You are not allowed to perform this action");
    }
    next();
  };
};

module.exports = requireRole;
