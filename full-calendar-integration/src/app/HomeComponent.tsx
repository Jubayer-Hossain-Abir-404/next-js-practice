'use client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import React from 'react';

const HomeComponent = () => {
  return (
    <>
      <nav className='flex justify-between mb-12 border-b border-violet-100 p-4'>
        <h1 className='font-bold text-2xl text-gray-500'>
          Calendar
        </h1>
        <main className='flex min-h-screen flex-col items-center justify-between p-24'>
          <div className='grid grid-cols-10'>
            <div className='col-span-8'>
              <FullCalendar
                plugins={[
                  dayGridPlugin,
                  interactionPlugin,
                  timeGridPlugin,
                ]}
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'resourceTimelineWeek,dayGridMonth,timeGridWeek',
                }}
                events={{ }}
                nowIndicator = {true}
                editable={true}
                droppable={true}
                selectable={true}
                selectMirror={true}
                dateClick= {() => {}}
                drop={() => {}}
                eventClick={() => {}}
              />
            </div>
          </div>
        </main>
      </nav>
    </>
  )
}

export default HomeComponent;