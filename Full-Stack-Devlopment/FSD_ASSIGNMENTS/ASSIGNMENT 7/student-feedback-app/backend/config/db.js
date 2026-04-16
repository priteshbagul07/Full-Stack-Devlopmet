const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ MongoDB Connected Successfully');
    console.log('📍 Database: feedbackdb (Local)');
  } catch (err) {
    console.error('❌ MongoDB Connection Failed');
    console.error('💡 Make sure MongoDB server is running on your Mac');
    console.error('🔗 Connection String:', process.env.MONGO_URI);
    process.exit(1);
  }
};

module.exports = connectDB;