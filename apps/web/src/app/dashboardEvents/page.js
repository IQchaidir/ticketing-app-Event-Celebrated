'use client';

import React, { useEffect, useState } from 'react';
import SidebarDashboard from '@/components/sidebarDashboard';
import Image from 'next/image';
import HeaderOrganizer from '@/components/HeaderOrganizer';
import axios from 'axios';

export default function DashboardEvents() {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.get(
        'http://localhost:8000/organizer/event',
        {
          headers: headers,
        },
      );

      const fetchedData = response.data;
      setEvents(fetchedData);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <HeaderOrganizer></HeaderOrganizer>
      <SidebarDashboard />
      <div
        id="main-content"
        class="h-full bg-gray-50 relative overflow-y-auto lg:ml-64"
      >
        <main>
          <div class="pt-6 px-4">
            <div class="">
              <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2">
                <div class="">
                  <div class="flex-shrink-0">
                    <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                      Events
                    </span>

                    {/* for line open */}
                    <div class="space-y-2 pt-2" />
                    {/* for line close */}

                    {/*content event list open */}
                    <div class="bg-white p-8 rounded-md w-full">
                      <div class=" flex items-center justify-between pb-6">
                        <div class="flex items-center justify-between">
                          <div class="flex bg-gray-50 items-center p-2 rounded-md">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="h-5 w-5 text-gray-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clip-rule="evenodd"
                              />
                            </svg>
                            <input
                              class="bg-gray-50 outline-none ml-1 block "
                              type="text"
                              name=""
                              id=""
                              placeholder="search..."
                            />
                          </div>
                        </div>
                      </div>

                      {/* Events List Open */}
                      <div>
                        <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                          <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                            <table class="min-w-full leading-normal">
                              <thead>
                                <tr>
                                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Events
                                  </th>
                                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Title
                                  </th>
                                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Price
                                  </th>
                                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Location
                                  </th>
                                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Date Time
                                  </th>
                                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    End Time
                                  </th>
                                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Coupons
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {events.map((event) => (
                                  <tr key={event.id}>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                      <div className="flex items-center">
                                        <div className="flex-shrink-0 w-10 h-10">
                                          {/* Jika ada URL gambar untuk event, ganti dengan tag img */}
                                          {event.image ? (
                                            <Image
                                              className="w-full h-full rounded-full"
                                              src={event.image}
                                              alt={event.title}
                                              width={100}
                                              height={100}
                                            />
                                          ) : (
                                            // Jika tidak ada URL gambar, Anda dapat menambahkan placeholder atau membiarkannya kosong
                                            <div className="w-full h-full bg-gray-300 rounded-full"></div>
                                          )}
                                        </div>
                                        <div className="ml-3">
                                          <p className="text-gray-900 whitespace-no-wrap">
                                            {event.title}
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                      <p className="text-gray-900 whitespace-no-wrap">
                                        {event.organizer}
                                      </p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                      <p className="text-gray-900 whitespace-no-wrap">
                                        {event.price}
                                      </p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                      <p className="text-gray-900 whitespace-no-wrap">
                                        {event.location}
                                      </p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                      <p className="text-gray-900 whitespace-no-wrap">
                                        {/* Konversi waktu ke zona waktu lokal */}
                                        {new Date(
                                          event.date_time,
                                        ).toLocaleString()}
                                      </p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                      <p className="text-gray-900 whitespace-no-wrap">
                                        {/* Konversi waktu ke zona waktu lokal */}
                                        {new Date(
                                          event.end_time,
                                        ).toLocaleString()}
                                      </p>
                                    </td>
                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                      <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                        <span
                                          aria-hidden
                                          class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                        ></span>
                                        <a
                                          href={`/organizer/event/${event.id}`}
                                        >
                                          <span class="relative">Coupons</span>
                                        </a>
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            <div class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                              <span class="text-xs xs:text-sm text-gray-900">
                                Showing 1 to 4 of 50 Entries
                              </span>
                              <div class="inline-flex mt-2 xs:mt-0">
                                <button class="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                                  Prev
                                </button>
                                &nbsp; &nbsp;
                                <button class="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                                  Next
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Events List Close */}
                    </div>
                    {/*content event list close */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
