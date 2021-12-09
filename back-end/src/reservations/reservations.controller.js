/**
 * List handler for reservation resources
 */
const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
//const { next } = require("../../../front-end/src/utils/date-time");

//START OF US-03
//MUST CONVERT TIMES IN ORDER TO COMPARE AGAINST EACH OTHER
function timeIsValid(req,res,next){
  const reservationDate = req.body.data.reservation_date
  const reservationTime = req.body.data.reservation_time
  //convert the res time to number
  const [reservationHour, reservationMinutes] = reservationTime.split(":");
  console.log("hours and minutes",reservationHour, reservationMinutes)
  console.log(reservationHour <= 10 && reservationMinutes <= 30)
  console.log(reservationHour >= 23 && reservationMinutes >= 30)
  //compare res time to 10:30
  const errors = [];
  // reservation date > currentDate
  // determines if reservation is future date
  
    // if reservation is before 10:30am
    if(reservationHour <= 10 && reservationMinutes <= 30){
      errors.push("too early")
    }
    //if reservation is after 9:30pm
    else if((reservationHour >= 21 && reservationMinutes >= 30) || reservationHour >= 22){
      errors.push("too late")
    }
    console.log('errors', errors)
  if(errors.length >= 1){
    return next({status: 400, message: errors })
  }
  next();
}

//validation for input fields
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
  create: [reservationIsValid, dateIsValid, timeIsValid, asyncErrorBoundary(create)]
};
