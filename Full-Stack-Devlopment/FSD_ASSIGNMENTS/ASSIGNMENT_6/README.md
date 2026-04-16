# 🚗 Assignment 6 – Vehicle Booking Application (Full Stack)

This project is a **Full Stack Vehicle Booking Application** developed using **Node.js, Express, and MongoDB**.
It allows users to register, log in, and book vehicle service appointments.

---

## 🚀 Features

* User Registration & Login (Authentication)
* Book vehicle service appointments
* View booked appointments
* Manage vehicle details
* RESTful API structure
* Backend connected with MongoDB

---

## 🛠️ Technologies Used

### Frontend:

* HTML5
* CSS3
* JavaScript

### Backend:

* Node.js
* Express.js

### Database:

* MongoDB (Mongoose)

---

## 📂 Project Structure

```id="x9l3ka"
Assignment6/
│
├── server.js / app.js       # Main backend server
├── package.json            # Dependencies
├── models/                 # Database models
│   ├── User.js
│   ├── Vehicle.js
│   ├── Appointment.js
│
├── routes/                 # API routes
│   ├── auth.js
│   ├── vehicles.js
│   ├── appointments.js
│
├── public/                 # Frontend files
│   ├── index.html
│   ├── css/
│   └── js/
```

---

## 📄 Description

This project demonstrates a **complete full-stack application** with backend, frontend, and database integration.

The system allows:

* Users to create accounts and log in
* Users to book vehicle service appointments
* Backend to handle requests using REST APIs
* Data storage and retrieval using MongoDB

It is a real-world example of CRUD operations and authentication.

---

## ▶️ How to Run

1. Download or clone the repository

2. Open the project folder

3. Install dependencies:

```id="n2l9sk"
npm install
```

4. Start MongoDB (Make sure MongoDB is running)

5. Run the server:

```id="k29dls"
node server.js
```

*(or `node app.js` depending on your file)*

6. Open browser and go to:

```id="p9d2ls"
http://localhost:3000
```

---

## ⚠️ Important Notes

* Ensure MongoDB is installed and running
* Update database connection string if needed
* You may need a `.env` file for configuration

---

## 🎯 Learning Outcomes

* Building full-stack applications
* REST API development
* MongoDB database integration
* Authentication and routing
* CRUD operations

---

## 📌 Future Improvements

* Add JWT authentication
* Improve UI/UX design
* Add admin dashboard
* Deploy application online

---

## 👨‍💻 Author

**Pritesh Bagul**
B.Tech Computer Engineering Student

---

## 📃 License

This project is created for educational purposes.
