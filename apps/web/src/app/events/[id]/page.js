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

  // const startDateOnly = new Date(event.date_time).toISOString().split('T')[0];
  // const startDateOnly = new Date(event.end_time).toISOString().split('T')[0];

  return (
    <div className="flex justify-center bg-contain">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
        <Image
          // src={event.imgUrl}
          src="/assets/images/hero.png"
          alt="eventimg"
          width={1000}
          height={1000}
          className="h-full min-h-[300px] object-cover object-center"
        />
        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6 ">
            <h2 className="h2-bold">{event.title}</h2>
            {/* <h2 className="h2-bold">TItle Event</h2> */}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex gap-3">
                <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                  {event.isFree ? 'FREE' : `$${event.price}`}
                  {/* FREE */}
                </p>
                <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                  {event.category}
                  {/* Music */}
                </p>
              </div>

              <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                by{' '}
                {/* <span className="text-primary-500">{event.organizer.firstName} {event.organizer.lastName}</span> */}
                <span className="text-primary-500">Yuk Bisnis</span>
              </p>
            </div>
          </div>

          {/* <CheckoutButton event={event} /> */}

          <div className="flex flex-col gap-5">
            <div className="flex gap-2 md:gap-3">
              <Image
                src="/assets/icons/calendar.svg"
                alt="calendar"
                width={32}
                height={32}
              />
              <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center">
                <p>
                  {formatDate(event.date_time)}
                  {/* tuesday,Jan15 03.00 PM */}
                </p>
                {/* <p>
                  {formatDate(event.end_time)} - {formatDate(event.end_time)}
                  tuesday,Jan15 03.00 PM
                </p> */}
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
              {/* <p className="p-medium-16 lg:p-regular-20">Bandung</p> */}
              {/* <p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">{event.url}</p> */}
              {/* <p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">
                LINK ZOOM
              </p> */}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="p-bold-20 text-grey-600">What Youll Learn:</p>
            <p className="p-medium-16 lg:p-regular-18">{event.description}</p>
            {/* <p className="p-medium-16 lg:p-regular-18">
              event yang sangat mantap sekali
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

//     <div className="flex justify-center bg-contain">
//       <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
//         <Image
//           // src={event.imgUrl}
//           src="/assets/images/hero.png"
//           alt="eventimg"
//           width={1000}
//           height={1000}
//           className="h-full min-h-[300px] object-cover object-center"
//         />
//         <div className="flex w-full flex-col gap-8 p-5 md:p-10">
//           <div className="flex flex-col gap-6 ">
//             {/* <h2 className="h2-bold">{event.title}</h2> */}
//             <h2 className="h2-bold">TItle Event</h2>

//             <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
//               <div className="flex gap-3">
//                 <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">
//                   {/* {event.isFree ? 'FREE' : `$${event.price}`} */}
//                   FREE
//                 </p>
//                 <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
//                   {/* {event.category.name} */}
//                   Music
//                 </p>
//               </div>

//               <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
//                 by{' '}
//                 {/* <span className="text-primary-500">{event.organizer.firstName} {event.organizer.lastName}</span> */}
//                 <span className="text-primary-500">Yuk Bisnis</span>
//               </p>
//             </div>
//           </div>

//           {/* <CheckoutButton event={event} /> */}

//           <div className="flex flex-col gap-5">
//             <div className="flex gap-2 md:gap-3">
//               <Image
//                 src="/assets/icons/calendar.svg"
//                 alt="calendar"
//                 width={32}
//                 height={32}
//               />
//               <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center">
//                 <p>
//                   {/* {formatDateTime(event.startDateTime).dateOnly} - {' '}
//                   {formatDateTime(event.startDateTime).timeOnly} */}
//                   tuesday,Jan15 03.00 PM
//                 </p>
//                 <p>
//                   {/* {formatDateTime(event.endDateTime).dateOnly} -  {' '}
//                   {formatDateTime(event.endDateTime).timeOnly} */}
//                   tuesday,Jan15 03.00 PM
//                 </p>
//               </div>
//             </div>

//             <div className="p-regular-20 flex items-center gap-3">
//               <Image
//                 src="/assets/icons/location.svg"
//                 alt="location"
//                 width={32}
//                 height={32}
//               />
//               {/* <p className="p-medium-16 lg:p-regular-20">{event.location}</p> */}
//               <p className="p-medium-16 lg:p-regular-20">Bandung</p>
//               {/* <p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">{event.url}</p> */}
//               <p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">
//                 LINK ZOOM
//               </p>
//             </div>
//           </div>

//           <div className="flex flex-col gap-2">
//             <p className="p-bold-20 text-grey-600">What Youll Learn:</p>
//             {/* <p className="p-medium-16 lg:p-regular-18">{event.description}</p> */}
//             <p className="p-medium-16 lg:p-regular-18">
//               event yang sangat mantap sekali
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventDetails;
