import CheckoutButton from '@/components/CheckoutButton';
import Image from 'next/image';

export async function generateStaticParams() {
  const res = await fetch('http://localhost:8000/event/discovery');
  const data = await res.json();

  return data.map((event) => ({
    id: event.id.toString(),
  }));
}

async function getEvent(id) {
  const res = await fetch(`http://localhost:8000/event/${id}`);
  const data = await res.json();
  return data;
}

export default async function EventDetails({ params }) {
  const event = await getEvent(params.id);

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

  return (
    <div className="flex justify-center bg-contain pt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
        <Image
          // src={event.imgUrl} //url gambar
          src="/assets/images/banner.jpg"
          alt="eventimg"
          width={1000}
          height={1000}
          className="h-full min-h-[300px]  object-center"
        />
        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6 ">
            <h2 className="h2-bold">{event.title}</h2>

            <div className="flex flex-col gap-3 sm:flex-col sm:items-start">
              <div className="flex gap-3">
                <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                  {event.is_free ? 'FREE' : `Rp.${event.price}`}
                </p>
                <p
                  className={`p-bold-20 rounded-full  ${
                    event.is_online ? 'bg-green-100' : 'bg-red-100'
                  } 
                  px-5 py-2 text-black`}
                >
                  {event.is_online ? 'ONLINE' : 'OFFLINE'}
                </p>
                <p className="p-bold-20 rounded-full bg-gray-500/10 px-5 py-2 text-gray-500">
                  {event.category}
                </p>
              </div>

              <p className="p-medium-20 ml-2 pt-0 md:pt-3">
                by{':'}
                {/* <span className="text-primary-500">{event.organizer.firstName} {event.organizer.lastName}</span> */}
                <span className="text-primary-500">Yuk Bisnis</span>
              </p>
            </div>
          </div>

          <CheckoutButton />

          <div className="flex flex-col gap-5">
            <div className="flex gap-2 md:gap-3">
              <Image
                src="/assets/icons/calendar.svg"
                alt="calendar"
                width={32}
                height={32}
              />
              <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center">
                <p>{formatDate(event.date_time)}</p>
              </div>
            </div>

            <div className="p-regular-20 flex items-center gap-3">
              <Image
                src="/assets/icons/location.svg"
                alt="location"
                width={32}
                height={32}
              />
              <p className="p-medium-16 lg:p-regular-20">{event.location}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="p-bold-20 text-grey-600">What Youll Learn:</p>
            <p className="p-medium-16 lg:p-regular-18">{event.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
