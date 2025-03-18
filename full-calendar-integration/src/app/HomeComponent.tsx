'use client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import React, { useState } from 'react';

interface Event {
  title: string;
  start?: Date | string;
  allDay?: boolean;
  id: number;
}

const HomeComponent = () => {
  const [events, setEvents] = useState<Event[]>(
    [
      { title: 'event 1', id: 1 },
      { title: 'event 2', id: 2 },
      { title: 'event 3', id: 3 },
      { title: 'event 4', id: 4 },
      { title: 'event 5', id: 5 },
    ]
  );

  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

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

            <div id='draggable-el' className='ml-8 w-full border-2 p-2 rounded-md mt-16 lg:h-1/2 bg-violet-50'>
                <h1 className='font-bold text-lg text-center'>Drag Event</h1>
                {
                  
                }
            </div>
          </div>
        </main>
      </nav>
    </>
  )
}

export default HomeComponent;