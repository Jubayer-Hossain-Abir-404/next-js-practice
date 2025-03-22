'use client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import React, { useEffect, useState } from 'react';

interface Event {
  title: string;
  start?: Date | string;
  allDay?: boolean;
  id: string;
}

type EventDateArg = {
  date: Date;
  allDay: boolean;
}

const HomeComponent = () => {
  const [events, setEvents] = useState<Event[]>(
    [
      { title: 'event 1', id: '1' },
      { title: 'event 2', id: '2' },
      { title: 'event 3', id: '3' },
      { title: 'event 4', id: '4' },
      { title: 'event 5', id: '5' },
    ]
  );

  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const [idToDelete, setIdToDelete] = useState<number | null>(null);
  const [newEvent, setNewEvent] = useState<Event>({ title: '', start: '', allDay: false, id: '0' });

  useEffect(() => {
    const draggableElement = document.getElementById('draggable-element');
    if (draggableElement) {
      new Draggable (draggableElement, {
        itemSelector: '.fc-event',
        eventData: function(eventElement) {
          return {
            title: eventElement.getAttribute('title'),
            id: eventElement.getAttribute('data'),
            start: eventElement.getAttribute('start'),
          }
        }
      });
    }
  }, []);

  const handleDateClick = (arg: EventDateArg) => {
    console.log(arg);
    setNewEvent({
      ...newEvent,
      start: arg.date,
      allDay: arg.allDay,
      id: new Date().getTime().toString(),
    });
    setShowModal(true);
  };

  const addEvent = (data: DropArg) => {
    console.log(data);
    const event = {
      ...newEvent,
      start: data.date.toISOString(),
      title: data.draggedEl.innerText,
      allDay: data.allDay,
      id: new Date().getTime().toString(),
    };
    setAllEvents([...allEvents, event]);
  };

  const handleDeleteModal = (data: { event: { id: string } }) => {
    setShowDeleteModal(true);
    setIdToDelete(parseInt(data?.event?.id));
  };

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
                events={allEvents}
                nowIndicator = {true}
                editable={true}
                droppable={true}
                selectable={true}
                selectMirror={true}
                dateClick= {handleDateClick}
                drop={(data) => {
                  addEvent(data)
                }}
                eventClick={() => {}}
              />
            </div>

            <div id='draggable-element' className='ml-8 w-full border-2 p-2 rounded-md mt-16 lg:h-1/2 bg-violet-50'>
                <h1 className='font-bold text-lg text-center'>Drag Event</h1>
                {
                  events.map((event) => {
                    return (
                      <div
                        title={event.title}
                        key={event.id}
                        className='fc-event border-2 p-1 m-2 w-full rounded-md ml-auto text-center bg-white'
                      >
                        {event.title}
                      </div>
                    )
                  })
                }
            </div>
          </div>
        </main>
      </nav>
    </>
  )
}

export default HomeComponent;