const db =require("../db/connection");

function create(reservationData){
    return db("reservations")
    .returning("*")
    .insert(reservationData);
}

function list(reservationDate){
    return db("reservations as r")
    .where({"r.reservation_date": reservationDate})
    .orderBy("r.reservation_time");
}

module.exports = {
    create,
    list
}