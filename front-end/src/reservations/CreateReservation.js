import ReservationForm from "./ReservationForm";
import { useHistory } from "react-router-dom";
import {createReservation} from "../utils/api";
import React, { useState } from "react";

function CreateReservation(){
    const history = useHistory();
    const [reservationErrors, setReservationsErrors] = useState([]);
    
    async function handleSubmit(event, reservationData) {
        
        event.preventDefault();
        try {
          await createReservation({
            ...reservationData,
            people: Number(reservationData.people),
          });
          let resDate = reservationData["reservation_date"];
    
          history.push(`/dashboard?date=${resDate}`);
        } catch (error) {
          console.error(error);
          setReservationsErrors(error.message);
          return;
        }
      }
      return (
          
          <div>
            { reservationErrors.length === 0 ? null : <ul >{reservationErrors.map((r) => <li className="alert alert-danger">{r}</li>)}</ul> }
            <h1>Create a reservation</h1>
            <ReservationForm handleSubmit={handleSubmit}/>

          </div>
      )
}

export default CreateReservation;