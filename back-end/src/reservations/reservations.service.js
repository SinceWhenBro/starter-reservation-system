const db =require("../db/connection");

function create(reservationData){
    return db("reservations")
    .returning("*")
    .insert(reservationData);
}

function list(reservationDate){
    return db("reservations as r")
    .where({"r.reservation_date": reservationDate})
    .whereNot({"r.status": "finished", "r.status": "cancelled"})
    .orderBy("r.reservation_time");
}

function read(reservation_Id){
    console.log("ID: ", reservation_Id);
    return db("reservations")
    .select("*")
    .where({"reservation_id": reservation_Id})
}

function updateStatus(reservationId, status){
    return db("reservations")
    .select("*")
    .where({"reservation_id": reservationId})
    .update({"status": status})
    .returning("*");
}

function update(reservationId, reservation){
    return db("reservations")
    .select("*")
    .where({"reservation_id": reservationId})
    .update(reservation)
    .returning("*");
}

function search(mobile_number) {
    return db("reservations")
        .whereRaw(
           "translate(mobile_number, '() -', '') like ?",
          `%${mobile_number.replace(/\D/g, "")}%`
         )
         .orderBy("reservation_date");
     }

module.exports = {
    create,
    list,
    read,
    updateStatus,
    search,
    update,
}