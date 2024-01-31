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
                      Events Statistics
                    </span>

                    {/* for line open */}
                    <div class="space-y-2 pt-2" />
                    {/* for line close */}

                    {/*content event list open */}
                    <div class="bg-white p-8 rounded-md w-full">
                      <div class=" flex items-center justify-between pb-6">
                        <div class="flex items-center justify-between"></div>
                      </div>

                      {/* Events List Open */}
                      <div class="relative flex items-top justify-center min-h-screen sm:items-center sm:pt-0">
                        <div class="max-w-xl mx-auto sm:px-6 lg:px-8">
                          <div class="flex items-center pt-8 sm:justify-start sm:pt-0">
                            <div class="px-4 text-lg text-gray-500 border-r border-gray-400 tracking-wider">
                              404
                            </div>
                            <div class="ml-4 text-lg text-gray-500 uppercase tracking-wider">
                              Not Found
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
