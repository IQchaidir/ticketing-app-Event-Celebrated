'use client';
import { Card } from '@/components/Card';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleClick = (button) => {
    setSelectedButton(button);
  };

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 sm:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold ">
              Host,Connect, Celebrate:Your Events,Our Platform!
            </h1>
            <p className="p-regular-20 md:p-regular-24">
              Book and learn helpful tips from 3,168+ mentors in world-class
              companies with ourglobal community
            </p>
            <button className="bg-black text-white rounded-xl p-2 w-full sm:w-fit">
              <Link href="#">Explore Now</Link>
            </button>
          </div>
          <Image
            src="/assets/images/hero.png"
            alt="heroimg"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[60vh]"
          />
        </div>
      </section>

      <section
        id="events"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="h2-bold">
          Trust by <br /> Thousand of Events
        </h2>
        <div className="flex  flex-row gap-5 ">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </section>
    </>
  );
}
