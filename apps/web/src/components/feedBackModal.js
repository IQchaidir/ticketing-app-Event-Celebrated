import axios from 'axios';
import { useState } from 'react';

const FeedbackModal = ({ isOpen, onClose, onSubmit, eventId }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [reviewExists, setReviewExists] = useState(false);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = async () => {
    const feedbackData = {
      rating,
      feedback,
      eventId,
    };
    try {
      const response = await axios.post(
        'http://localhost:8000/review/create',
        feedbackData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
      if (response.data && response.data.reviewExists) {
        setReviewExists(true);
      }
      alert('review telah dibuat');
    } catch (error) {
      console.error('Error:', error);
    }

    onSubmit(feedbackData);
  };

  return (
    <div className={`modal ${isOpen ? 'flex' : 'hidden'}`}>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-container">
        <div className="modal-header">
          <h3 className="text-xl font-semibold">Give Feedback</h3>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-content">
          <div className="flex items-center mb-4">
            <p className="mr-4">Rating:</p>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className={`star-button ${star <= rating ? 'filled' : ''}`}
                onClick={() => handleRatingChange(star)}
              >
                ★
              </button>
            ))}
          </div>
          <div className="mb-4">
            <p>Feedback:</p>
            <textarea
              className="textarea"
              value={feedback}
              onChange={handleFeedbackChange}
            />
          </div>
          <button className="submit-button" onClick={handleSubmit}>
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
