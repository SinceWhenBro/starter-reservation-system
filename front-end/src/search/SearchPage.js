import React, { useState } from "react";
import ListedReservations from "../reservations/ListedReservations";
import {listReservations} from "../utils/api"

function SearchPage(){
    const [phoneNumber, setPhoneNumber] = useState();
    const [reservations, setReservations] = useState();
    const [reservationsError, setReservationsError] = useState([]);

    function handleFind(event){
        event.preventDefault();
        listReservations({ mobile_number: phoneNumber })
            .then(setReservations)
            .catch(setReservationsError);
    }

    function handleChange(event){
        setPhoneNumber(event.target.value);
    }

    function reservationsTemplate(){
        if(reservations){
            if(reservations.length === 0){
                return "No reservations found";
            } else {
                return reservations.map((r) => (
                    <ListedReservations
                        key={r.reservation_id}
                        reservation={r}
                      />
                    ))
            }
        } else {
            return "";
        }
    }

    return (
    <div>
    <form onSubmit={handleFind}>
    <div class="input-group">
        <div class="form-outline">
            <input name="mobile_number" type="search" id="form1" class="form-control" onChange={handleChange}/>
            <label class="form-label" for="form1">Enter a customer's phone number</label>
        </div>
            <button type="submit" class="btn btn-primary">
                <i class="fas fa-search">Find</i>
            </button>
    </div>
    </form>
    
    {reservationsTemplate()}
    
    </div>
    )  
}

export default SearchPage;