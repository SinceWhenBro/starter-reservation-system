import React from "react";
import { Link, useHistory } from "react-router-dom";
import { updateReservationStatus } from "../utils/api";

function ListedReservations({ reservation }){
  const history = useHistory();
  
  async function handleCancel(event){
      if(window.confirm("Do you want to cancel this reservation?"))
      {
        try{
          await updateReservationStatus({...reservation, status: "cancelled"})
          history.go(0)
        } catch(error) {
          console.error(error)
        }
         
      }
    }
    return (
        <div className=" border col-5 tableCard justify-content-center" data-reservation-id-status={reservation.reservation_id}>
          
          {reservation.reservation_id &&(
            <div className="d-flex justify-content-center">
            <p>{reservation.first_name}</p>
            <p>{reservation.last_name}</p>
            <p data-reservation-id-status={reservation.reservation_id}>{reservation.status}</p>
            {reservation.status === "booked" && <Link to={`/reservations/${reservation.reservation_id}/seat`}><button className="btn btn-danger mb-2">Seat</button></Link>}
            <Link to={`/reservations/${reservation.reservation_id}/edit`}><button>Edit</button></Link>
            <button data-reservation-id-cancel={reservation.reservation_id} onClick={handleCancel}>Cancel</button>
            </div>
          )}
        </div>
      );
    }

export default ListedReservations;