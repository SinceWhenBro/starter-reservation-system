const service = require("./tables.service");
const reservationsService  = require("../reservations/reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function seatIsValid(req,res,next){
  seatData = req.body.data
  console.log("seatData",seatData)
  const errors = [] 
  if(!seatData){
    next({status:400, message: "seat data is missing"})
  }
  if(!seatData.reservation_id){
    errors.push("reservation_id")
  } else {
    res.locals.reservation = (await reservationsService.read(seatData.reservation_id))[0]
    if(!res.locals.reservation){
      next({status: 404, message: `reservation ${seatData.reservation_id} does not exist`})
    } else {
      if(res.locals.table.capacity < res.locals.reservation.people){
        errors.push("capacity")
      }
    }
  }
  if(res.locals.table.reservation_id){
    errors.push("occupied")
  }
  if(errors.length > 0){
    next({status: 400, message: errors});
  }
  next();
}

function isTableOccupied(req,res,next){
  if(res.locals.table.reservation_id) {
    next()
  } else {
    next({status: 400, message: "not occupied"})
  }
}

async function tableExists(req,res,next){
    const data = (await service.read(Number(req.params.table_id)))
    console.log(data)
    if(!data.length){
      return next({status: 404, message: `${req.params.table_id} not found`})
    }
    res.locals.table = data[0]
    next()
}

function tableIsValid(req,res,next){
    tableData = req.body.data;
    //if inout field doesn't exist
    if(!tableData){
      next({status:400, message: "table data is missing"})
    }
    const errors = [];
  
    if(!tableData.table_name || tableData.table_name.length === 1){
      errors.push("table_name");
    }
    if(!tableData.capacity || typeof tableData.capacity !== "number"){
      errors.push("capacity");
    }
    if(errors.length > 0){
      next({status: 400, message: errors});
    }
    next();
  }

async function list(req, res) {
  console.log("list")
  const data = await service.list()
  console.log(data);
  res.json({
    data: data,
  });
}

async function create(req, res){
  const data = (await service.create(req.body.data))[0];
  res.status(201).json({data});
}

async function destroy(req,res){
  const data = (await service.destroy(res.locals.table))[0];
  res.status(200).json({data});
}

async function update(req, res, next){
  res.locals.table.reservation_id = res.locals.reservation.reservation_id;
  const data = (await service.update(res.locals.table))[0]
  res.status(200).json({data})
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [tableIsValid, asyncErrorBoundary(create)],
  update: [asyncErrorBoundary(tableExists), asyncErrorBoundary(seatIsValid), asyncErrorBoundary(update)],
  destroy: [asyncErrorBoundary(tableExists), isTableOccupied, asyncErrorBoundary(destroy)]
};
