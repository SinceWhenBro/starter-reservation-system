/**
 * List handler for reservation resources
 */
const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
//const { next } = require("../../../front-end/src/utils/date-time");

//need to use date utility functions 
//unsure if im referencing the query var correctly

function reservationIsValid(req,res, next){
  reservationData = req.body.data;
  //if inout field doesn't exist
  if(!reservationData){
    next({status:400, message: "data is missing"})
  }
  const errors = [];
  //|| !reservationData.last_name || !reservationData.mobile_number ||
  //!reservationData.reservation_date || !reservationData.reservation_time || !reservationData.people
  if(!reservationData.first_name){
    errors.push("first_name");
  }
  if(!reservationData.last_name){
    errors.push("last_name");
  }
  if(!reservationData.mobile_number){
    errors.push("mobile_number");
  }
  const dateFormat = /\d\d\d\d-\d\d-\d\d/;
  const timeFormat = /\d\d:\d\d/;
  if(!reservationData.reservation_date || !reservationData.reservation_date.match(dateFormat)){
    errors.push("reservation_date");
  }
  if(!reservationData.reservation_time || !reservationData.reservation_time.match(timeFormat)){
    errors.push("reservation_time");
  }
  if(!reservationData.people || typeof reservationData.people !== "number"){
    errors.push("people");
  }
  if(errors.length > 0){
    next({status: 400, message: errors});
  }
  next();
}
//middleware validation
function dateIsValid(req, res, next) {
  //validation for tuesday 
  const reservation = req.body.data;
  console.log(reservation.reservation_date);
    const reservationDate = new Date(reservation.reservation_date +  " 00:00:00" );
    console.log(reservationDate);
    const reservationTime = new Date(reservation.reservation_date + " " + reservation.reservation_time);
    console.log(reservationTime);
    const today = new Date();
    const errors = []
  if(reservationDate && reservationDate.getDay() === 2){
    
    errors.push("closed")
  }
  //validation for past day 
  if(reservationTime && reservationTime < today) {
    errors.push("future")
  }
  if(errors.length > 0){
    next({status: 400, message: errors})
  }
  next();
}

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
  create: [reservationIsValid, dateIsValid, asyncErrorBoundary(create)]
};
