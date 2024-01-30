import Link from 'next/link';

export const HeaderNavItem = () => {
  return (
    <div className={`flex gap-2 items-center`}>
      <Link href="/events/createEventForm">
        <button className="p-2 hover:bg-black hover:text-white rounded-md">
          Create Event
        </button>
      </Link>
    </div>
  );
};
