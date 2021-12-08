const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  console.log("list")
  console.log(req.query);
  const data = await service.list(req.query.date)
  console.log(data);
  res.json({
    data: data,
  });
}

async function create(req, res){
  const data = (await service.create(req.body.data))[0];
  res.status(201).json({data});
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [asyncErrorBoundary(create)]
};
