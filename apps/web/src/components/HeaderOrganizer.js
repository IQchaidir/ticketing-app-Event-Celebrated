'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Navitem } from './Navitem';
import { Navmobile } from './Navmobile';
import axios from 'axios';
import UserDropdown from './userDropDown';
import { useRouter } from 'next/navigation';
import OrganizerDropdown from './organizerDropDown';
import { HeaderNavItem } from './HeaderNavItem';

const HeaderOrganizer = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setIsLoggedIn(true);
      fetchdataUser(token);
    }
  }, []);

  const fetchdataUser = async (token) => {
    try {
      const response = await axios.get('http://localhost:8000/user/email', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const userData = response.data;
        console.log(userData);
        setUserData(userData);
      } else {
        console.error('Error fetching user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserData(null);
    router.push('/login');
  };

  return (
    <header className="w-full border-b sticky top-0 bg-white z-50">
      <div className="flex items-center justify-between pr-10 pl-10">
        <Link href="/dashboardEvents" className="w-auto h-auto">
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
            <HeaderNavItem></HeaderNavItem>
          </nav>

          <div className="flex w-auto justify-end gap-3">
            {isLoggedIn && (
              <OrganizerDropdown
                userEmail={userData?.email}
                onLogout={handleLogout}
              />
            )}
            {!isLoggedIn && (
              <>
                <button className="p-2 hover:bg-black hover:text-white rounded-md">
                  <Link href="/login">Log In</Link>
                </button>
                <button className="p-2 hover:bg-black hover:text-white rounded-md">
                  <Link href="/registerEO">Sign Up</Link>
                </button>
              </>
            )}
            {/* 
            <Navmobile></Navmobile> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderOrganizer;
