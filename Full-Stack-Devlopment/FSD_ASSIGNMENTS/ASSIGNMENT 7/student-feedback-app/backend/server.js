const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const feedbackRoutes = require('./routes/feedbackRoutes');

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/feedbacks', feedbackRoutes);

const PORT = process.env.PORT || 1919;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📡 Backend connected to Local MongoDB (Compass)`);
});