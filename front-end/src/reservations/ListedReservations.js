import React from "react";
import { Link } from "react-router-dom";

function ListedReservations({ reservation }){
    console.log(reservation)
    return (
        <div className=" border col-5 tableCard justify-content-center" data-reservation-id-status={reservation.reservation_id}>
          
          {reservation.reservation_id &&(
            <div className="d-flex justify-content-center">
            <p>{reservation.first_name}</p>
            <p>{reservation.last_name}</p>
            <p data-reservation-id-status={reservation.reservation_id} >{reservation.status}</p>
            {reservation.status === "booked" && <Link to={`/reservations/${reservation.reservation_id}/seat`}><button className="btn btn-danger mb-2">Seat</button></Link>}
            </div>
          )}
        </div>
      );
    }

export default ListedReservations;