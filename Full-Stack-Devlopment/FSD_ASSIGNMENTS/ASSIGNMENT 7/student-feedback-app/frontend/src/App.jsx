import { useState, useEffect } from 'react';
import FeedbackForm from './components/FeedbackForm.jsx';
import FeedbackList from './components/FeedbackList.jsx';
import axios from 'axios';

const API_URL = 'http://localhost:1919/api/feedbacks';

function App() {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get(API_URL);
      setFeedbacks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const addFeedback = (newFeedback) => {
    setFeedbacks([newFeedback, ...feedbacks]);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-2 text-blue-700">📚 EduFeedback</h1>
        <p className="text-center text-gray-600 mb-10">Share your honest feedback about courses</p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <FeedbackForm onFeedbackAdded={addFeedback} />

          {/* List */}
          <FeedbackList feedbacks={feedbacks} />
        </div>
      </div>
    </div>
  );
}

export default App;