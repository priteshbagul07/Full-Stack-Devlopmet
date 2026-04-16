# EduFeedback - Student Feedback Review System

A modern **Full Stack Student Feedback System** built with React.js, Express.js, and Local MongoDB.

**Project for Full Stack Development**

---

## ✨ Features

- Submit course feedback with rating (1-5 stars)
- Real-time feedback display (Latest first)
- Clean and responsive UI with **Tailwind CSS**
- Local MongoDB integration using **MongoDB Compass**

---

## 🛠 Tech Stack

- **Frontend**: React.js (Vite) + Tailwind CSS + Axios
- **Backend**: Node.js + Express.js + Mongoose
- **Database**: MongoDB (Local via Compass)

---

## 📁 Folder Structure
student-feedback-app/
├── backend/
│   ├── config/db.js
│   ├── controllers/feedbackController.js
│   ├── models/Feedback.js
│   ├── routes/feedbackRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── vite.config.js
│   └── package.json
└── README.md
text---

## 🚀 Setup Instructions (Mac + VS Code)

### 1. Start MongoDB Server

Open Terminal and run:
```bash
mongod --dbpath ~/data/db
(Keep this terminal open)
First time setup:
Bashmkdir -p ~/data/db

### 2. Create Database in MongoDB Compass

Open MongoDB Compass
Connect to: mongodb://localhost:27017
Create Database: feedbackdb
Collection: feedbacks


#### 3. Backend Setup
Bashcd backend
npm install
npm run dev
Backend will run on: http://localhost:1919

#### 4. Frontend Setup (Important - Tailwind CSS)
Bashcd frontend
npm install

Then start frontend:
Bashnpm run dev
Frontend will run on: http://localhost:5173


# 🎯 Troubleshooting

ProblemSolutionCSS not workingRun npm install in frontend and restart npm run devMongoDB connection errorMake sure mongod is runningPort 1919 already in useChange PORT in .envTailwind styles missingCheck tailwind.config.js and restart server

 # 📋 API Endpoints
MethodEndpointDescriptionGET/api/feedbacksGet all feedbacksPOST/api/feedbacksSubmit new feedback

 # 👨‍💻 Author : 
Pritesh Bagul 
Full Stack Development Project

Made with ❤️ using React, Express & MongoDB