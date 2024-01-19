'use client';
import React, { useState } from 'react';

const FilterModal = ({ isOpen, onClose, applyFilters }) => {
  const [onlineEventFilter, setOnlineEventFilter] = useState(false);
  const [dateFilters, setDateFilters] = useState({
    today: false,
    tomorrow: false,
    thisWeekend: false,
  });
  const [priceFilters, setPriceFilters] = useState({
    paid: false,
    free: false,
  });
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleOnlineEventChange = () => {
    setOnlineEventFilter((prevFilter) => !prevFilter);
  };

  const handleDateChange = (filter) => {
    setDateFilters({
      today: filter === 'today',
      tomorrow: filter === 'tomorrow',
      thisWeekend: filter === 'thisWeekend',
    });
  };

  const handlePriceChange = (filter) => {
    setPriceFilters({
      paid: filter === 'paid',
      free: filter === 'free',
    });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory((prevCategory) =>
      prevCategory === category ? '' : category,
    );
  };

  const handleApplyFilters = () => {
    applyFilters({
      onlineEventFilter,
      dateFilters,
      priceFilters,
      selectedCategory,
    });
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Filters</h2>
        {/* Online filter */}
        <label className="block mb-2 text-base">
          <input
            type="checkbox"
            className="mr-2"
            checked={onlineEventFilter}
            onChange={handleOnlineEventChange}
          />
          Online Event
        </label>
      </div>

      {/* Checkbox Date */}
      <h2 className="text-base font-semibold mb-2">Date</h2>
      <label className="block mb-2 text-base">
        <input
          type="checkbox"
          className="mr-2"
          checked={dateFilters.today}
          onChange={() => handleDateChange('today')}
        />
        Today
      </label>
      <label className="block mb-2 text-base">
        <input
          type="checkbox"
          className="mr-2"
          checked={dateFilters.tomorrow}
          onChange={() => handleDateChange('tomorrow')}
        />
        Tomorrow
      </label>
      <label className="block mb-2 text-base">
        <input
          type="checkbox"
          className="mr-2"
          checked={dateFilters.thisWeekend}
          onChange={() => handleDateChange('thisWeekend')}
        />
        This Weekend
      </label>

      {/* Checkbox Price */}
      <h2 className="text-base font-semibold mb-2">Price</h2>
      <label className="block mb-2 text-base">
        <input
          type="checkbox"
          className="mr-2"
          checked={priceFilters.paid}
          onChange={() => handlePriceChange('paid')}
        />
        Paid
      </label>
      <label className="block mb-2 text-base">
        <input
          type="checkbox"
          className="mr-2"
          checked={priceFilters.free}
          onChange={() => handlePriceChange('free')}
        />
        Free
      </label>

      {/* Filter Category */}
      <div className="mb-4 mt-4">
        <h2 className="text-base font-semibold mb-2">Category</h2>
        <label className="block mb-2 text-base">
          <input
            type="checkbox"
            className="mr-2"
            checked={selectedCategory === 'music'}
            onChange={() => handleCategoryChange('music')}
          />
          Music
        </label>
        <label className="block mb-2 text-base">
          <input
            type="checkbox"
            className="mr-2"
            checked={selectedCategory === 'seminar'}
            onChange={() => handleCategoryChange('seminar')}
          />
          Seminar
        </label>
        <label className="block mb-2 text-base">
          <input
            type="checkbox"
            className="mr-2"
            checked={selectedCategory === 'etc'}
            onChange={() => handleCategoryChange('etc')}
          />
          etc
        </label>
      </div>
      <button
        className="bg-black text-white p-2 rounded"
        onClick={handleApplyFilters}
      >
        Apply Filters
      </button>

      <button className="modal-close" onClick={onClose}>
        &times;
      </button>
    </div>
  );
};

export default FilterModal;
