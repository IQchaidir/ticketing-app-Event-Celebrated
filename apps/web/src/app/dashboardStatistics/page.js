import React from 'react';
import SidebarDashboard from '@/components/sidebarDashboard';
import HeaderOrganizer from '@/components/HeaderOrganizer';

export default function DashboardStatistics() {
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
                              <tbody>
                                <tr>
                                  <td>
                                    <div class="flex items-center justify-center py-8 px-4">
                                      {/* Statistics */}
                                      <div class="w-11/12 lg:w-2/3">
                                        <div class="flex flex-col justify-between h-full">
                                          <div>
                                            <div class="lg:flex w-full justify-between">
                                              <h3 class="text-gray-600 dark:text-gray-400 leading-5 text-base md:text-xl font-bold">
                                                Selling Overview
                                              </h3>
                                              <div class="flex items-center justify-between lg:justify-start mt-2 md:mt-4 lg:mt-0">
                                                <div class="flex items-center">
                                                  <button class="py-2 px-4 bg-gray-100 dark:bg-gray-700 rounded ease-in duration-150 text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-200">
                                                    Dollars
                                                  </button>
                                                  <button class="py-2 px-4 bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 rounded text-white ease-in duration-150 text-xs hover:bg-indigo-600">
                                                    Tickets
                                                  </button>
                                                </div>
                                                <div class="lg:ml-14">
                                                  <div class="bg-gray-100 dark:bg-gray-700 ease-in duration-150 hover:bg-gray-200 pb-2 pt-1 px-3 rounded-sm">
                                                    <select
                                                      aria-label="select year"
                                                      class="text-xs text-gray-600 dark:text-gray-400 bg-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 rounded"
                                                    >
                                                      <option class="leading-1">
                                                        Year
                                                      </option>
                                                      <option class="leading-1">
                                                        2020
                                                      </option>
                                                      <option class="leading-1">
                                                        2019
                                                      </option>
                                                    </select>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div class="flex items-end mt-6">
                                              <h3 class="text-indigo-500 leading-5 text-lg md:text-2xl">
                                                65,875
                                              </h3>
                                              <div class="flex items-center md:ml-4 ml-1 text-green-700">
                                                <p class="text-green-700 text-xs md:text-base">
                                                  17%
                                                </p>
                                                <svg
                                                  role="img"
                                                  class="text-green-700"
                                                  aria-label="increase. upward arrow icon"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="12"
                                                  height="12"
                                                  viewBox="0 0 12 12"
                                                  fill="none"
                                                >
                                                  <path
                                                    d="M6 2.5V9.5"
                                                    stroke="currentColor"
                                                    stroke-width="0.75"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                  ></path>
                                                  <path
                                                    d="M8 4.5L6 2.5"
                                                    stroke="currentColor"
                                                    stroke-width="0.75"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                  ></path>
                                                  <path
                                                    d="M4 4.5L6 2.5"
                                                    stroke="currentColor"
                                                    stroke-width="0.75"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                  ></path>
                                                </svg>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="mt-6">
                                            <canvas
                                              id="myChart"
                                              width="1025"
                                              height="400"
                                              role="img"
                                              aria-label="line graph to show selling overview in terms of months and numbers"
                                            ></canvas>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
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
