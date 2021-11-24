const db =require("../db/connection");

function create(reservationData){
    return db("reservations")
    .insert(reservationData);
}

module.exports = {
    create
}