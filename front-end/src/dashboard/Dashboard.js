import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ListedTables from "../tables/ListedTables";
import ListedReservations from "../reservations/ListedReservations";
const moment = require("moment");
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const tableList = tables.map((table) => 
    <li key ={table.table_name}>
      {JSON.stringify(table)}
    </li>
  );

  useEffect(loadDashboard, [date]);
  useEffect(loadTables, []);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  function loadTables(){
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal)
      .then(setTables)
      .then(setTablesError);
      return () => abortController.abort();
  }

  let queryDate = new URLSearchParams(useLocation().search).get("date")
  console.log(queryDate)
  if(!queryDate){
    queryDate = moment().format("YYYY-MM-DD");
    // const today = new Date()
    // queryDate = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`
  }
  const prevDay = moment(queryDate).subtract(1,"days");
  const nextDate = moment(queryDate).add(1,"days");
  const nextDateString = moment(nextDate).format("YYYY-MM-DD");
  const prevDateString = moment(prevDay).format("YYYY-MM-DD");
  // const currentDate = new Date(queryDate);
  // console.log(currentDate)
  // const nextDate = currentDate;
  // nextDate.setDate(nextDate.getDate()+1)
  // const nextDateString = `${nextDate.getFullYear()}-${nextDate.getMonth()+1}-${nextDate.getDate()}`

  // let queryDate = new URLSearchParams(useLocation().search).get("date")
  // console.log(queryDate)
  // if(!queryDate){
  //   const today = new Date()
  //   queryDate = `${today.getUTCFullYear()}-${today.getUTCMonth()+1}-${today.getUTCDate()}`
  // }
  // const currentDate = new Date(queryDate);
  // console.log(currentDate)
  // const nextDate = currentDate;
  // nextDate.setUTCDate(nextDate.getUTCDate()+1)
  // const nextDateString = `${nextDate.getUTCFullYear()}-${nextDate.getUTCMonth()+1}-${nextDate.getUTCDate()}`

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <div>
      {reservations.map((r) => (
          <ListedReservations
            key={r.reservation_id}
            reservation={r}
          />
        ))}
        </div>
      <div>
      {tables.map((t) => (
          <ListedTables
            key={t.table_id}
            table={t}
            setTables={setTables}
            setReservations={setReservations}
            date={date}
          />
        ))}
      </div>
      <Link to={`/dashboard?date=${nextDateString}`}><button>Next</button></Link>
      <Link to={`/dashboard`}><button>Today</button></Link>
      <Link to={`/dashboard?date=${prevDateString}`}><button>Previous</button></Link>
    </main>
  );
}

export default Dashboard;
