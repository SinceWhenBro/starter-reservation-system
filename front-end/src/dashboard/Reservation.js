import React, { useState } from "react";
import { useHistory } from "react-router-dom"
import { createReservation } from "../utils/api"
//create state 

//save each input as a key value pair in an obj

//make a post request to a server

function Reservation(){
    const [reservationData, setReservationData] = useState("");
    const [reservationErrors, setReservationsErrors] = useState([]);
    const initialState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: '',
        reservation_time: '',
        people: "0",
        
      };
    const history = useHistory();

    function handleChange({target}){
        setReservationData({...reservationData, [target.name]: target.value})
    }

    function handleCancel(event){
        console.log("cancel")
        history.goBack();
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try{
            await createReservation({...reservationData, people:Number(reservationData.people)})
            let resDate = reservationData['reservation_date'];
            //const response = await createReservation(reservationData);
            //console.log(response);
            setReservationData({...initialState})
            history.push(`/dashboard?date=${resDate}`)
        }
        catch(error){
            console.error(error)
            setReservationsErrors(error.message);
            return;
        }
    }

    return(
        
        <div>
        { reservationErrors.length === 0 ? null : <ul >{reservationErrors.map((r) => <li className="alert alert-danger">{r}</li>)}</ul> }
        <h1>Create a reservation</h1>
        <form onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="col-lg-4">
                    <label htmlFor="first_name">First name: </label>
                    <input name="first_name" type="text" className="form_control" onChange={handleChange} required/>
                </div>
                <div className="col">
                    <label htmlFor="last_name">Last name: </label>
                    <input name="last_name" type="text" className="form_control" onChange={handleChange} required/>
                </div>
                <div className="col">
                    <label htmlFor="mobile_number">Mobile Number: </label>
                    <input name="mobile_number" type="text" className="form_control" onChange={handleChange} required/>
                </div>
            </div>
            <div className="form-row">
                <div className="col-lg-4">
                    <label htmlFor="reservation_date">Reservation Date: </label>
                    <input name="reservation_date" type="date" className="form_control" onChange={handleChange} required/>
                </div>
                <div className="col-lg-4">
                    <label htmlFor="reservation_time">Reservation Time: </label>
                    <input name="reservation_time" type="time" className="form_control" onChange={handleChange} required/>
                </div>
                <div className="col">
                    <label htmlFor="people">Number of People: </label>
                    <input name="people" type="text" className="form_control" min={1} onChange={handleChange} required/>
                </div>
            </div>
            <div className="form-row">
                <div className="col">
                    <button type="submit" className="btn btn-primary mb-2">Submit</button>
                    <button type="cancel" className="btn btn-danger mb-2" onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </form>
        </div>
    )
}

export default Reservation;