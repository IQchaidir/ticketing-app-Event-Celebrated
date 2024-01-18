'use client';
import { Card } from '@/components/Card';
import { useState } from 'react';

const SearchPage = () => {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleClick = (button) => {
    setSelectedButton(button);
  };

  return (
    <div className=" wrapper flex flex-col md:flex-row-reverse min-h-screen">
      <main className="md:w-full lg:w-5/6 px-6 pb-6 ">
        <h1 className="text-3xl font-semibold mb-4">Find Event</h1>

        <form className="mb-4 md:flex md:items-center w-full lg:w-1/2">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border border-gray-300 rounded-l mb-2 md:mb-0 md:flex-1"
          />
        </form>

        {/* button filter */}

        <div className="flex flex-row lg:hidden gap-5 pb-5 w-full  ">
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
              selectedButton === 'Today' ? 'clicked' : ''
            }`}
            onClick={() => handleClick('Today')}
          >
            Today
          </button>
          <button
            className={`custom-button ${
              selectedButton === 'This Weekend' ? 'clicked' : ''
            }`}
            onClick={() => handleClick('This Weekend')}
          >
            This Weekend
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4 md:gap-8">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </main>

      <aside className=" hidden lg:block w-1/6 p-6 pl-0 pt-0">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Filters</h2>
          {/* Add your filter options here */}
          <label className="block mb-2 text-base">
            <input type="checkbox" className="mr-2" />
            online event
          </label>
        </div>

        {/* Filter Date */}
        <div className="mb-4 mt-4">
          <h2 className="text-base font-semibold mb-2">Date</h2>
          <label className="block mb-2 text-base">
            <input type="checkbox" className="mr-2" />
            Today
          </label>
          <label className="block mb-2 text-base">
            <input type="checkbox" className="mr-2" />
            Tommorow
          </label>
          <label className="block mb-2 text-base">
            <input type="checkbox" className="mr-2" />
            This Weekend
          </label>
        </div>

        {/* Filter Price */}
        <div className="mb-4 mt-4">
          <h2 className="text-base font-semibold mb-2">Date</h2>
          <label className="block mb-2 text-base">
            <input type="checkbox" className="mr-2" />
            Paid
          </label>
          <label className="block mb-2 text-base">
            <input type="checkbox" className="mr-2" />
            Free
          </label>
        </div>

        {/* Filter Category */}
        <div className="mb-4 mt-4">
          <h2 className="text-base font-semibold mb-2">Category</h2>
          <label className="block mb-2 text-base">
            <input type="checkbox" className="mr-2" />
            Music
          </label>
          <label className="block mb-2 text-base">
            <input type="checkbox" className="mr-2" />
            Bussiness
          </label>
          <label className="block mb-2 text-base">
            <input type="checkbox" className="mr-2" />
            etc
          </label>
        </div>

        <button className="bg-black text-white p-2 rounded ">
          Apply Filters
        </button>
      </aside>
    </div>
  );
};

export default SearchPage;
