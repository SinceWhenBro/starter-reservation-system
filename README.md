# Capstone: Restaurant Reservation System

## Description

>You are a full stack app developer at Periodic Tables, a startup that is creating a reservation system for fine dining restaurants. The software is used only by restaurant personnel when a customer calls to request a reservation. At this point, the customers will not access the system online.

## Technology Used
- React
   - React hooks
   - React router
- Node
- Postgres
- Express
- CSS
- Bootstrap4
- HTML
- JavaScript
- RESTful APIs

Live Site: https://restaurant-res-client-tw.herokuapp.com/dashboard (Must redeploy through netlify as Heroku has eliminated their free plan).

## Existing files

This repository is set up as a monorepo, meaning that the frontend and backend projects are in one repository. This allows you to open both projects in the same editor.

As you work through the user stories listed later in this document, you will be writing code that allows your frontend and backend applications to talk to each other. You will also write code to allow your controllers and services to connect to, and query, your PostgreSQL database via Knex.

The table below describes the folders in this starter repository:


| Folder/filepath | Description |
| ------------ | ------------ |
| ./back-end | The backend project, which runs on `localhost:5001` by default. |
| ./front-end | The frontend project, which runs on `localhost:3000` by default. |

## Database Setup

1. Set up four new ElephantSQL database instances - development, test, preview, and production - by following the instructions in the "PostgreSQL: Creating & Deleting Databases" checkpoint.
2. After setting up your database instances, connect DBeaver to your new database instances by following the instructions in the "PostgreSQL: Installing DBeaver" checkpoint.

### Knex

Run `npx knex` commands from within the `back-end` folder, which is where the `knexfile.js` file is located.

## Installation 

1. Fork and clone this repository.
2. Run `cp ./back-end/.env.sample ./back-end/.env`.
3. Update the `./back-end/.env` file with the connection URL's to your ElephantSQL database instance.
4. Run `cp ./front-end/.env.sample ./front-end/.env`.
5. You should not need to make changes to the `./front-end/.env` file unless you want to connect to a backend at a location other than `http://localhost:5001`.
6. Run `npm install` to install project dependencies.
7. Run `npm run start:dev` to start your server in development mode.

## User Stories

### US-01 Create and list reservations

As a restaurant manager
I want to create a new reservation when a customer calls
so that I know how many customers will arrive at the restaurant on a given day.

#### Acceptance Criteria

1. The `/reservations/new` page will
   - Have the following required and not-nullable fields:
     - First name: `<input name="first_name" />`
      - Last name: `<input name="last_name" />`
      - Mobile number: `<input name="mobile_number" />`
      - Date of reservation: `<input name="reservation_date" />`
      - Time of reservation: `<input name="reservation_time" />`
      - Number of people in the party, which must be at least 1 person.` <input name="people" />`
   - Display a `Submit` button that, when clicked, saves the new reservation, then displays the `/dashboard` page for the date of the new reservation
   - Display a `Cancel` button that, when clicked, returns the user to the previous page
   - Display any error messages returned from the API
2. The `/dashboard` page will
   - List all reservations for one date only. (E.g. if the URL is `/dashboard?date=2035-12-30 `then send a GET to `/reservations?date=2035-12-30` to list the reservations for that date). The date is defaulted to today, and the reservations are sorted by time.
   - Display next, previous, and today buttons that allow the user to see reservations on other dates
   - Display any error messages returned from the API
3. The `/reservations` API will have the same validations as above and will return 400, along with an informative error message, when a validation error happens.
   - Seed the reservations table with the data contained in `./back-end/src/db/seeds/00-reservations.json`

### US-02 Create reservation on a future, working date

As a restaurant manager
I only want to allow reservations to be created on a day when we are open
so that users do not accidentally create a reservation for days when we are closed.

#### Acceptance Criteria

1. The `/reservations/new` page will display an error message with `className="alert alert-danger"` if any of the following constraints are violated:
   - The reservation date is a Tuesday as the restaurant is closed on Tuesdays.  
   - The reservation date is in the past. Only future reservations are allowed.
2. The `/reservations` API will have the same validations as above and will return 400, along with an informative error message, when a validation error happens.

### US-03 Create reservation within eligible timeframe

As a restaurant manager
I want to create a new reservation when a customer calls
so that I know how many customers will arrive at the restaurant on a given day.

#### Acceptance Criteria

1. The `/reservations/new` page will display an error message with `className="alert alert-danger"`, if any of the following additional constraints are violated:
   - The reservation time is before 10:30 AM.
   - The reservation time is after 9:30 PM, because the restaurant closes at 10:30 PM and the customer needs to have time to enjoy their meal.
   - The reservation date and time combination is in the past. Only future reservations are allowed. E.g., if it is noon, only allow reservations starting after noon today.
   - Display any error messages returned from the API
2. The `/reservations` API will have the same validations as above and will return 400, along with an informative error message, when a validation error happens.

### US-04 Seat Reservation

As a restaurant manager,
When a customer with an existing reservation arrives at the restaurant
I want to seat (assign) their reservation to a specific table
so that I know which tables are occupied and free.

#### Acceptance Criteria

1. The `/tables/new` page will
   - Have the following required and not-nullable fields:
      - Table name: `<input name="table_name" />`, which must be at least 2 characters long.
      - Capacity: `<input name="capacity" />`, this is the number of people that can be seated at the table, which must be at least 1 person.
      - Mobile number: `<input name="mobile_number" />`
      - Date of reservation: `<input name="reservation_date" />`
      - Time of reservation: `<input name="reservation_time" />`
      - Number of people in the party, which must be at least 1 person.` <input name="people" />`
   - Display a `Submit` button that, when clicked, saves the new reservation, then displays the `/dashboard` page
   - Display a `Cancel` button that, when clicked, returns the user to the previous page
2. The `/dashboard` page will
   - Display a list of all reservations in one area.
   - Each reservation in the list will:
      - Display a "Seat" button on each reservation.
      - The "Seat" button must be a link with an href attribute that equals /reservations/${reservation_id}/seat, so it can be found by the tests.
   - Display a list of all tables, sorted by table_name, in another area of the dashboard
      - Each table will display "Free" or "Occupied" depending on whether a reservation is seated at the table.
      - The "Free" or "Occupied" text must have a data-table-id-status=${table.table_id} attribute, so it can be found by the tests.
3. The `/reservations/:reservation_id/seat` page will
   - Have the following required and not-nullable fields:
      - Table number: `<select name="table_id" />`. The text of each option must be `{table.table_name} - {table.capacity}` so the tests can find the options.
   - Do not seat a reservation with more people than the capacity of the table
   - Display a `Submit` button that, when clicked, assigns the table to the reservation then displays the `/dashboard` page
   - PUT to `/tables/:table_id/seat/` in order to save the table assignment. The body of the request must be `{ data: { reservation_id: x } }` where X is the reservation_id of the reservation being seated. The tests do not check the body returned by this request.
   - Display a `Cancel` button that, when clicked, returns the user to the previous page
4. The tables table must be seeded with the following data:
   - `Bar #1` & `Bar #2`, each with a capacity of 1.
   - `#1` & `#2`, each with a capacity of 6.
5. The `/tables` API will have the same validations as above and will return 400, along with an informative error message, when a validation error happens.
   - If the table capacity is less than the number of people in the reservation, return 400 with an error message.
   - If the table is occupied, return 400 with an error message.

### US-05 Finish an occupied table 

As a restaurant manager
I want to free up an occupied table when the guests leave
so that I can seat new guests at that table.

#### Acceptance Criteria

1. The `/dashboard` page will
   - Display a "Finish" button on each occupied table.
   - The "Finish" button must have a `data-table-id-finish={table.table_id}` attribute, so it can be found by the tests.
   - Clicking the "Finish" button will display the following confirmation: "Is this table ready to seat new guests? This cannot be undone." If the user selects "Ok" the system will: - Send a `DELETE` request to `/tables/:table_id/seat` in order to remove the table assignment. The tests do not check the body returned by this request. - The server should return 400 if the table is not occupied. - Refresh the list of tables to show that the table is now available.today.
   - Clicking the "Cancel" button makes no changes.

### US-06 Reservation Status

As a restaurant manager
I want a reservation to have a status of either booked, seated, or finished
so that I can see which reservation parties are seated, and finished reservations are hidden from the dashboard.

Acceptance Criteria

#### Acceptance Criteria

1. The `/dashboard` page will
   - Display the status of the reservation. The default status is "booked"
      - the status text must have a `data-reservation-id-status={reservation.reservation_id} attribute`, so it can be found by the tests.
   - Display the Seat button only when the reservation status is "booked".
   - Clicking the Seat button changes the status to "seated" and hides the Seat button.the system will: - Send a `DELETE` request to `/tables/:table_id/seat` in order    - Clicking the Finish button associated with the table changes the reservation status to "finished" and removes the reservation from the dashboard.
   - To set the status, PUT to /reservations/:reservation_id/status with a body of {data: { status: "<new-status>" } } where <new-status> is one of booked, seated, or finished. Please note that this is only tested in the back-end for now.

### US-07 Search for a reservation by phone number

As a restaurant manager
I want to search for a reservation by phone number (partial or complete)
so that I can quickly access a customer's reservation when they call about their reservation.

#### Acceptance Criteria

1. The `/search` page will
   - Display a search box `<input name="mobile_number" />` that displays the placeholder text: "Enter a customer's phone number"
   - Display a "Find" button next to the search box.
   - Clicking on the "Find" button will submit a request to the server (e.g. GET `/reservations?mobile_number=800-555-1212`)   
      - Then the system will look for the reservation(s) in the database and display all matched records on the `/search` page using the same reservations list component as the `/dashboard` page.
      - The search page will display all reservations matching the phone number, regardless of status.
   - display `No reservations found` if there are no records found after clicking the Find button.
   
### US-08 Change an existing reservation

As a restaurant manager
I want to be able to modify a reservation if a customer calls to change or cancel their reservation
so that reservations are accurate and current.

#### Acceptance Criteria

1. The `/dashboard` and the `/search` page will
   - Display an "Edit" button next to each reservation
      - Clicking the "Edit" button will navigate the user to the `/reservations/:reservation_id/edit page`
   - The "Edit" button must be a link with an `href` attribute that equals `/reservations/${reservation_id}/edit`, so it can be found by the tests.
   - Display a "Cancel" button next to each reservation
   - The Cancel button must have a `data-reservation-id-cancel={reservation.reservation_id}` attribute, so it can be found by the tests.
   - Display `No reservations found` if there are no records found after clicking the Find button.
   - Clicking the "Cancel" button will display the following confirmation: "Do you want to cancel this reservation? This cannot be undone."
      - Clicking "Ok" on the confirmation dialog, sets the reservation status to `cancelled`, and the results on the page are refreshed.
         - set the status of the reservation to `cancelled` using a PUT to `/reservations/:reservation_id/status` with a body of `{data: { status: "cancelled" } }`.
      - Clicking "Cancel" on the confirmation dialog makes no changes.
2. The `/reservations/:reservation_id/edit` page will display the reservation form with the existing reservation data filled in
   - Only reservations with a status of "booked" can be edited.
   - Clicking the "Submit" button will save the reservation, then displays the previous page.
   - Clicking "Cancel" makes no changes, then display the previous page.



# Dashboard:
![image](https://user-images.githubusercontent.com/70001770/145658810-6acb8cf3-97f9-4a8f-aeb0-b5067f7ef08c.png)

# New Reservation:
![image](https://user-images.githubusercontent.com/70001770/145658814-f065ee93-239f-4090-9539-d17a0533fab0.png)

# New Table:
![image](https://user-images.githubusercontent.com/70001770/145658825-931a71f1-1097-4952-98b6-9c79e72ea371.png)

# Search by Phone Number:
![image](https://user-images.githubusercontent.com/70001770/145658842-216cbcb9-5238-4866-968e-90ce2c942ab7.png)


# Installation Insturctions

>1. run 'npm install --legacy-peer-deps'
>2. run 'npm run start'
>3. run 'npm run test'
