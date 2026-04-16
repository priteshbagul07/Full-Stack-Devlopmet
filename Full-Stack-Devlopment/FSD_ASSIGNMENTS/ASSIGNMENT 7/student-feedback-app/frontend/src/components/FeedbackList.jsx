export default function FeedbackList({ feedbacks }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 h-fit max-h-[600px] overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-6 sticky top-0 bg-white pb-4 border-b">Recent Feedbacks</h2>
      
      {feedbacks.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No feedback yet. Be the first to submit!</p>
      ) : (
        <div className="space-y-6">
          {feedbacks.map((fb) => (
            <div key={fb._id} className="border rounded-xl p-5">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-semibold text-lg">{fb.course}</span>
                  <span className="ml-3 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                    ⭐ {fb.rating}/5
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(fb.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-3 text-gray-700 italic">"{fb.comment}"</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}