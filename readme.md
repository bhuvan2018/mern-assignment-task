# MERN Stack Assignment: CSTech Infosolutions Pvt. Ltd.
Name: Bhuvan Shetty
This is my submission for the **MERN Stack Developer Internship** assignment.
The project is built using **MongoDB, Express.js, React.js, and Node.js** and it covers all the core requirements: admin login, agent management, and CSV upload/distribution.

---

## Features

### Admin Login

* Secure login with **JWT authentication**
* Verifies credentials from MongoDB
* Redirects to dashboard after successful login

### Agent Management

* Admin can add agents with the following details:
  * Name
  * Email
  * Mobile number (with country code)
  * Password
* Agents are stored in MongoDB for task distribution

### CSV Upload & Distribution

* Upload a `.csv` file containing:
  * FirstName
  * Phone
  * Notes
* Validates file format and structure
* Distributes the uploaded data equally among all agents
* If the total count isn’t divisible by the number of agents, the remaining items are distributed sequentially
* Distributed data is saved to MongoDB and displayed on the dashboard

---

## Tech Stack

**Frontend:** React (Vite)
**Backend:** Node.js + Express.js
**Database:** MongoDB (Atlas)
**Authentication:** JWT
**Styling:** CSS

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/bhuvan2018/mern-assignment-task.git
cd mern-assignment-task
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:

```
PORT=5000
MONGO_URI=<your-mongo-uri>
JWT_SECRET=supersecret123
```

Run the backend:

```bash
npm run dev
```

You should see:

```
Server running on port 5000
MongoDB Connected: ...
```

### 3. Frontend setup

```bash
cd ../frontend
npm install
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173)

---

## Testing Flow

1. **Login** using your admin credentials (`email` + `password` from MongoDB).
2. Go to the **Add Agent** section to create agents.
3. Upload a **CSV** file with valid columns (`FirstName`, `Phone`, `Notes`).
4. The system automatically distributes the list among all agents.
5. Check **Distributed Lists** to view assigned data for each agent.

---
---