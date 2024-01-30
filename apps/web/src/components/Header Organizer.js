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
      <div className="flex items-center justify-between">
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
            {isLoggedIn && (
              <OrganizerDropdown
                userEmail={userData?.email}
                onLogout={handleLogout}
              />
            )}
            {/* 
            <Navmobile></Navmobile> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
