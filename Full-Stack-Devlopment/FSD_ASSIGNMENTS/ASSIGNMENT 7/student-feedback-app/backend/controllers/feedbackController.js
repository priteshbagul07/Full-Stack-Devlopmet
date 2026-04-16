const Feedback = require('../models/Feedback');

const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createFeedback = async (req, res) => {
  try {
    const { course, rating, comment } = req.body;
    const feedback = new Feedback({ course, rating, comment });
    const savedFeedback = await feedback.save();
    res.status(201).json(savedFeedback);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getFeedbacks, createFeedback };