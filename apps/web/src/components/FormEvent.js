'use client';
import Link from 'next/link';
import { useState } from 'react';

const FormEvent = () => {
  //Value Form
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  //tipe tempat location
  const [eventType, setEventType] = useState('online');
  const [onlineLocation, setOnlineLocation] = useState('');
  const [venueLocation, setVenueLocation] = useState('');
  //tipe harga
  const [priceType, setEventPrice] = useState('paid');
  const [price, setPrice] = useState('');
  //datetime event
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  //tipe tempat location
  const handleEventTypeChange = (type) => {
    setEventType(type);
  };

  //tipe harga event
  const handleEventPriceChange = (type) => {
    setEventPrice(type);

    // Reset harga jika jenis acara diubah menjadi 'Free'
    if (type === 'free') {
      setPrice('');
    }
  };

  //datetime event
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  const handleSubmit = () => {
    console.log('Form Data:', {
      title: title,
      // organizer_id: /* ID pengguna yang membuat acara, mungkin perlu diambil dari autentikasi */,
      price: price,
      date_time: new Date(`${startDate} ${startTime}`),
      end_time: new Date(`${endDate} ${endTime}`),
      location: eventType === 'online' ? onlineLocation : venueLocation,
      description: description,
      //   seats: parseInt(totalSeats, 10), // Konversi totalSeats menjadi angka
      is_free: priceType === 'free' ? true : false,
      is_online: eventType === 'online' ? true : false,
      category: {
        connect: { id: categoryId },
      },
    });
  };

  return (
    <form className=" flex flex-col gap-5bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="TITLE"
        >
          TITLE
        </label>
        <input
          type="text"
          id="TITLE"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="TITLE"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="ORGANIZER"
        >
          ORGANIZER
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="ORGANIZER"
          type="text"
          placeholder="ORGANIZER"
        />
      </div>
      <div className="relative">
        {/* <label
              class="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              CATEGORY
            </label> */}
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          id="CATEGORY"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option disabled value="">
            CATEGORY
          </option>
          <option value="1">Option 1</option>
          <option value="musik">musik</option>
          <option value="3">Option 3</option>
        </select>
        <div className="pointer-events-none absolute inset-y-5  right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>

      <div className="mb-6 mt-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="DESCRIPTION"
        >
          DESCRIPTION
        </label>
        <textarea
          id="DESCRIPTION"
          name="description"
          rows="4"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="DESCRIPTION"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      {/*tipe lokasi*/}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          LOCATION
        </label>
        <div className="flex items-center">
          <button
            type="button"
            className={`mr-4 py-3 px-2 rounded-lg ${
              eventType === 'online' ? 'bg-blue-500 text-white' : 'bg-gray-300'
            }`}
            onClick={() => handleEventTypeChange('online')}
          >
            Online
          </button>
          <button
            type="button"
            className={`py-3 px-2 rounded-lg bg-blue-500 text-white ${
              eventType === 'venue' ? 'bg-blue-500 text-white' : 'bg-gray-300'
            }`}
            onClick={() => handleEventTypeChange('venue')}
          >
            Venue
          </button>
        </div>
      </div>

      {eventType === 'online' && (
        <div className="mb-4 ">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Online Location:
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="ONLINELOCATION"
            value={onlineLocation}
            onChange={(e) => setOnlineLocation(e.target.value)}
          />
        </div>
      )}

      {eventType === 'venue' && (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Venue Location:
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="VENUELOCATION"
            value={venueLocation}
            onChange={(e) => setVenueLocation(e.target.value)}
          />
        </div>
      )}

      {/*datetime*/}
      <label className="block text-gray-700 text-sm font-bold mb-2">
        DATE AND TIME
      </label>
      <div className="flex w-full gap-2">
        <div className="mb-4 w-1/2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="startDate"
          >
            Start Date:
          </label>
          <input
            type="date"
            id="startDate"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={startDate}
            onChange={handleStartDateChange}
          />
        </div>

        <div className="mb-4 w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="startTime"
          >
            Start Time:
          </label>
          <input
            type="time"
            id="startTime"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={startTime}
            onChange={handleStartTimeChange}
          />
        </div>
      </div>

      <div className="flex w-full gap-2">
        <div className="mb-4 w-1/2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="endDate"
          >
            End Date:
          </label>
          <input
            type="date"
            id="endDate"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </div>

        <div className="mb-4 w-1/2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="endTime"
          >
            End Time:
          </label>
          <input
            type="time"
            id="endTime"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={endTime}
            onChange={handleEndTimeChange}
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          EVENT PRICE
        </label>
        <div className="flex items-center">
          <button
            type="button"
            className={`mr-4 py-3 px-2 rounded-lg text-black ${
              eventType === 'free' ? 'bg-blue-500 text-white' : 'bg-gray-300'
            }`}
            onClick={() => handleEventPriceChange('free')}
          >
            Free
          </button>
          <button
            type="button"
            className={` py-3 px-2 rounded-lg  text-black ${
              priceType === 'paid' ? 'bg-blue-500 text-white' : 'bg-gray-300'
            }`}
            onClick={() => handleEventPriceChange('paid')}
          >
            Paid
          </button>
        </div>
      </div>

      {priceType === 'paid' && (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Price:
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="PRICE"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      )}
      {/* <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="Total Seats"
        >
          Total Seats
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="Total Seats"
          type="text"
          placeholder="Total Seats"
        />
      </div> */}
      <div className="flex justify-end">
        <Link href="/events/createEventForm/preview_publish">
          <button
            type="button"
            onClick={handleSubmit}
            className=" bg-blue-500 text-white p-2 text-lg rounded-md hover:bg-blue-600"
          >
            Create Event
          </button>
        </Link>
      </div>
    </form>
  );
};

export default FormEvent;
