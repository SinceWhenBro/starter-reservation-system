import React, { useEffect, useState } from "react";

function ReservationForm({
  handleSubmit,
  handleCancel,
  initialState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "0",
  },
}){

  const [reservationData, setReservationData] = useState(initialState);

  function updateReservationData(){
      if(initialState.reservation_id !== reservationData.reservation_id){
        setReservationData({...initialState, reservation_date: initialState.reservation_date.substring(0,10)})
      }
  }

  useEffect(updateReservationData, [initialState, reservationData.reservation_id]);

  function handleChange({ target }) {
    setReservationData({ ...reservationData, [target.name]: target.value });
  }

  return (
    <div>
      <form onSubmit={(event) => handleSubmit(event, reservationData)}>
        <div className="form-row">
          <div className="col-lg-4">
            <label htmlFor="first_name">First name: </label>
            <input
              name="first_name"
              type="text"
              className="form_control"
              onChange={handleChange}
              value={reservationData.first_name}
              required
            />
          </div>
          <div className="col">
            <label htmlFor="last_name">Last name: </label>
            <input
              name="last_name"
              type="text"
              className="form_control"
              onChange={handleChange}
              value={reservationData.last_name}
              required
            />
          </div>
          <div className="col">
            <label htmlFor="mobile_number">Mobile Number: </label>
            <input
              name="mobile_number"
              type="text"
              className="form_control"
              onChange={handleChange}
              value={reservationData.mobile_number}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="col-lg-4">
            <label htmlFor="reservation_date">Reservation Date: </label>
            <input
              name="reservation_date"
              type="date"
              className="form_control"
              onChange={handleChange}
              value={reservationData.reservation_date}
              required
            />
          </div>
          <div className="col-lg-4">
            <label htmlFor="reservation_time">Reservation Time: </label>
            <input
              name="reservation_time"
              type="time"
              className="form_control"
              onChange={handleChange}
              value={reservationData.reservation_time}
              required
            />
          </div>
          <div className="col">
            <label htmlFor="people">Number of People: </label>
            <input
              name="people"
              type="text"
              className="form_control"
              min={1}
              onChange={handleChange}
              value={reservationData.people}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="col">
            <button type="submit" className="btn btn-primary mb-2">
              Submit
            </button>
            <button
              type="cancel"
              className="btn btn-danger mb-2"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
