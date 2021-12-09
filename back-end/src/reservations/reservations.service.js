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

function read(reservation_Id){
    console.log("ID: ", reservation_Id);
    return db("reservations")
    .select("*")
    .where({"reservation_id": reservation_Id})
}

module.exports = {
    create,
    list,
    read,
}