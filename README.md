# Capstone: Restaurant Reservation System

>You are a full stack app developer at Periodic Tables, a startup that is creating a reservation system for fine dining restaurants. The software is used only by restaurant personnel when a customer calls to request a reservation. At this point, the customers will not access the system online.

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

# Dashboard:
![image](https://user-images.githubusercontent.com/70001770/145658810-6acb8cf3-97f9-4a8f-aeb0-b5067f7ef08c.png)

# New Reservation:
![image](https://user-images.githubusercontent.com/70001770/145658814-f065ee93-239f-4090-9539-d17a0533fab0.png)

# New Table:
![image](https://user-images.githubusercontent.com/70001770/145658825-931a71f1-1097-4952-98b6-9c79e72ea371.png)

# Search by Phone Number:
![image](https://user-images.githubusercontent.com/70001770/145658842-216cbcb9-5238-4866-968e-90ce2c942ab7.png)

# Tehcnology Used:

* JavaScript
  * React.js
  * Express.js
  * PostgreSQL
  * HTML
  * CSS
  * Moment.js library

# Installation Insturctions

1. run 'npm install --legacy-peer-deps'
2. run 'npm run start'
3. run 'npm run test'
