const { NotFound } = require("../errors/index");

const routeNotFound = (req, res) => {
  throw new NotFound("Route not found");
};

module.exports = routeNotFound;
