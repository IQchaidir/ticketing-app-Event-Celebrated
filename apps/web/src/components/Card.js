import Link from 'next/link';

export const Card = () => {
  return (
    <div
      className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl
     bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px] "
    >
      <Link
        // href={`/events/${event.id}`}
        href={`/events/1`}
        // style={{ backgroundImage: `url(${event.imageUrl})` }}
        style={{ backgroundImage: `url(/assets/images/hero.png)` }}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center
            text-gray-500"
      />
      <Link
        // href={`/events/${event.id}`}
        href={`/events/1`}
        className="flex min-h-[230px] flex-col gap-2 p-5 md:gap-2"
      >
        <div className="flex gap-2">
          <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-black">
            {/* {event.isFree ? `FREE` : `${event.price}`} */}
            FREE
          </span>
          <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-black">
            {/* {event.isOnline ? `ONLINE` : ``} */}
            ONLINE
          </span>
          <p className="p-semibold-14 w-min rounded-full bg-gray-500/10 px-4 py-1 text-black">
            {/* {event.category.name} */}
            MUSIC
          </p>
        </div>
        <p className="p-medium-16 md:p-medium-20  text-black">
          {/* {event.title} */}
          Entrepreneur Academy
        </p>
        <p className="p-medium-14 md:p-medium-16  text-black">
          {/* {formatDateTime(event.starDateTime).dateTime} */}
          Tue,Dec 19, 12.25 PM
        </p>
        <p className="p-medium-14 md:p-medium-16 line line-clamp-2 flex-1 text-gray-500">
          {/* {event.location */}
          Hotel Travello
        </p>
        <div className="flex-between w-full">
          <p className="p-medium-14 md:p-medium-16 text-gray-600">
            {/*event.organizer.*/}
            YukBisnis
          </p>
        </div>
      </Link>
    </div>
  );
};
