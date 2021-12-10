import React from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import CreateReservation from "../reservations/CreateReservation";
import EditReservation from "../reservations/EditReservation";
import Tables from "../tables/Table";
import SeatPage from "../reservations/SeatPage"
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import SearchPage from "../search/SearchPage";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const date = new URLSearchParams(useLocation().search).get("date");
  

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={date || today()} />
      </Route>
      <Route exact={true} path="/reservations/new">
        <CreateReservation/>
      </Route>
      <Route path="/reservations/:reservation_id/seat">
        <SeatPage/>
      </Route>
      <Route path="/reservations/:reservation_id/edit">
        <EditReservation/>
      </Route>
      <Route  path="/tables/new">
        <Tables/>
      </Route>
      <Route  path="/search">
        <SearchPage/>
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
