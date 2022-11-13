const theatersService = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


async function listTheaters(req, res) {
  const data = await theatersService.listTheaters();
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(listTheaters),
};
