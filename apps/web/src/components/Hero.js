import Image from 'next/image';
import Link from 'next/link';

export const Hero = () => {
  return (
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
        className="max-h-[70vh] object-contain object-center h-auto"
      />
    </div>
  );
};
