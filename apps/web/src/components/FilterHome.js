'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';

export const FilterHome = () => {
  const [selectedButton, setSelectedButton] = useState('All');
  const [events, setEvents] = useState([]);

  const handleClick = (button) => {
    setSelectedButton(button);
  };
  const itemsPerPage = 8;
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        let queryParams = {};

        switch (selectedButton) {
          case 'Online':
            queryParams.is_online = true;
            break;
          case 'Free':
            queryParams.is_free = true;
            break;
          default:
            break;
        }

        const response = await axios.get(
          'http://localhost:8000/event/discovery',
          {
            params: {
              ...queryParams,
              _sort: 'id:ASC',
              date_time: { gte: new Date().toISOString() },
              take: itemsPerPage,
            },
          },
        );

        const fetchedData = response.data;
        setEvents(fetchedData);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [selectedButton]);

  return (
    <>
      <h2 className="h2-bold">
        Trust by <br /> Thousand of Events
      </h2>
      <div className="flex text-lg md:text-2xl  flex-row gap-5 ">
        <button
          className={`custom-button ${
            selectedButton === 'All' ? 'clicked' : ''
          }`}
          onClick={() => handleClick('All')}
        >
          All
        </button>
        <button
          className={`custom-button ${
            selectedButton === 'Online' ? 'clicked' : ''
          }`}
          onClick={() => handleClick('Online')}
        >
          Online
        </button>

        <button
          className={`custom-button ${
            selectedButton === 'Free' ? 'clicked' : ''
          }`}
          onClick={() => handleClick('Free')}
        >
          Free
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
        {Array.isArray(events) && events.length > 0 ? (
          events.map((event) => (
            <div className="flex justify-center" key={event.id}>
              <Card event={event} />
            </div>
          ))
        ) : (
          <p>No events found.</p>
        )}
      </div>
    </>
  );
};
