'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Credit() {
  const [data, setData] = useState([]);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.get(
        'http://localhost:8000/user/referralPoint',
        {
          headers: headers,
        },
      );

      const fetchedData = response.data;
      setData(fetchedData);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <div className="wrapper">
        <div className="flex flex-col gap-10">
          <h1 className="h1-bold">CREDIT</h1>
          <h2 className="h2-bold">Total Point: {data.totalPoint}</h2>
          <h2 className="h2-bold">Referral Code: {data.referralCode}</h2>
          <div className="flex flex-col md:flex-row"></div>
        </div>
      </div>
    </>
  );
}
