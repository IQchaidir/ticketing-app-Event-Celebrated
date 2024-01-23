import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Navitem } from './Navitem';
import { Navmobile } from './Navmobile';

const Header = () => {
  return (
    <header className="w-full border-b sticky top-0 bg-white z-50">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="w-auto h-auto">
          <Image
            src="/assets/images/company.png"
            alt="logo"
            width={128}
            height={38}
            className="h-full"
          />
        </Link>

        <div className="flex gap-2">
          <nav className="hidden md:flex-between w-auto">
            <Navitem></Navitem>
          </nav>

          <div className="flex w-auto justify-end gap-3">
            <button className="p-2 hover:bg-black hover:text-white rounded-md">
              <Link href="/auth/login">Log In</Link>
            </button>
            <button className="p-2 hover:bg-black hover:text-white rounded-md">
              <Link href="/sign-in">Sign Up</Link>
            </button>
            <Navmobile></Navmobile>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
