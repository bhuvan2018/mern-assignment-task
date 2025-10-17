# MERN Stack Internship Assignment: CSTech Infosolutions Pvt. Ltd.

 **Name:** Bhuvan Shetty
 **Demo Video:** [Watch Here](https://drive.google.com/file/d/1GeRgmCAQTtrm_cKctfj4JasdZED0co_P/view?usp=sharing)

---

## Overview

This project is built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)** as part of the internship assignment.
It implements a simple admin panel where the admin can log in, add agents, upload CSV files, and distribute records equally among agents.

---

## Features

### Admin Login

* Secure authentication using **JWT**
* Validates admin credentials from MongoDB
* Redirects to dashboard after login

### Agent Management

* Add agents with name, email, mobile, and password
* Data stored in MongoDB for list distribution

### CSV Upload & Distribution

* Upload `.csv` file containing:
  * FirstName
  * Phone
  * Notes
* Validates format and distributes entries equally among all agents
* Stores distributed lists in MongoDB and displays them on the frontend

---

## Tech Stack

* **Frontend:** React (Vite)
* **Backend:** Node.js + Express.js
* **Database:** MongoDB (Atlas)
* **Auth:** JWT
* **Styling:** CSS

---

## Setup Guide

1. **Clone the repo**

   ```bash
   git clone https://github.com/bhuvan2018/mern-assignment-task.git
   cd mern-assignment-task
   ```

2. **Backend Setup**

   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file:

   ```
   PORT=5000
   MONGO_URI=<your-mongo-uri>
   JWT_SECRET=supersecret123
   ```

   Start server:

   ```bash
   npm run dev
   ```

3. **Frontend Setup**

   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173)

4. **Execution**

Open http://localhost:5173 : for the Login and Dashboard

Visit http://localhost:5173/lists : to view distributed lists per agent

---

## Flow

1. Login using admin credentials
2. Add agents
3. Upload CSV file
4. View distributed lists on dashboard

---