'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import FeedbackModal from './feedBackModal';
import Image from 'next/image';

const Ticket = ({ event }) => {
  const [showReviewButton, setShowReviewButton] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [eventId, setEventId] = useState(0);

  useEffect(() => {
    const isEventEnded = new Date(event.end_time) < new Date();
    setShowReviewButton(isEventEnded);
  }, [event.end_time]);

  const formatDate = (isoDate) => {
    const options = {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };

    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', options);
  };

  const handleFeedbackSubmit = (feedbackData) => {
    console.log('Feedback submitted:', feedbackData, eventId);
    handleCloseFeedbackModal();
  };

  const handleOpenFeedbackModal = (eventId) => {
    setEventId(eventId);
    setIsFeedbackModalOpen(true);
  };

  const handleCloseFeedbackModal = () => {
    setIsFeedbackModalOpen(false);
  };

  return (
    <div className="flex min-h-[380px] w-full  flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg ">
      <Link href={`/events/${event.id}`}>
        <Image src={event.image} alt="img" height={1000} width={1000}></Image>
      </Link>
      <div
        href={`/events/${event.id}`}
        className="flex h-auto flex-col gap-2 p-5 md:gap-2"
      >
        <p className="p-medium-16 md:p-medium-20 text-black">{event.title}</p>
        <p className="p-medium-14 md:p-medium-16 text-black">
          {formatDate(event.date_time)}
        </p>
        <p className="p-medium-14 md:p-medium-16 text-gray-500">
          {event.location}
        </p>
        <div className="flex-between w-full">
          <p className="p-medium-14 md:p-medium-16 text-gray-600">
            {event.organizer}
          </p>
          {showReviewButton && (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => handleOpenFeedbackModal(event.id)}
            >
              Review
            </button>
          )}
        </div>
        <FeedbackModal
          isOpen={isFeedbackModalOpen}
          onClose={handleCloseFeedbackModal}
          onSubmit={handleFeedbackSubmit}
          eventId={eventId}
        />
      </div>
    </div>
  );
};

export default Ticket;
