'use client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import React, { Fragment, useEffect, useState } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/16/solid';

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
  const events: Event[] =
    [
      { title: 'event 1', id: '1' },
      { title: 'event 2', id: '2' },
      { title: 'event 3', id: '3' },
      { title: 'event 4', id: '4' },
      { title: 'event 5', id: '5' },
    ]
  ;

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

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setIdToDelete(null);
    setShowModal(false);
    setNewEvent({ title: '', start: '', allDay: false, id: '0' });
  };

  const handleDelete = () => {
    setAllEvents(allEvents.filter((event) => Number(event?.id) !== Number(idToDelete)));
    setShowDeleteModal(false);
    setIdToDelete(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEvent({
      ...newEvent,
      title: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAllEvents([...allEvents, newEvent]);
    handleCloseModal();
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
                eventClick={handleDeleteModal}
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

          <Transition show={showDeleteModal} as={Fragment}>
            <Dialog as='div' className='relative z-10' onClose={setShowDeleteModal}>
              <TransitionChild 
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
              </TransitionChild>

              <div className='fixed inset-0 z-10 overflow-y-auto'>
                <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
                  <TransitionChild
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                    enterTo='opacity-100 translate-y-0 sm:scale-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                    leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                  >
                    <DialogPanel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                      <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 flex items-center justify-center'>
                        <div className='rounded-full bg-red-100 p-2'>
                          <ExclamationTriangleIcon className='h-6 w-6 text-red-600' aria-hidden='true' />
                        </div>
                        <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                            <DialogTitle as='h3' className='text-base font-semibold leading-6 text-gray-900'>
                              Delete Event
                            </DialogTitle>
                            <div className='mt-2'>
                              <p className='text-sm text-gray-500'>
                                Are you sure you want to delete this event?
                              </p>
                            </div>
                        </div>
                      </div>

                      <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                        <button type='button' className='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto'
                        onClick={handleDelete}>
                          Delete
                        </button>
                        <button type='button' className='inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 sm:mt-0 sm:w-auto'
                          onClick={handleCloseModal}>
                          Cancel
                        </button>
                      </div>
                    </DialogPanel>
                  </TransitionChild>
                </div>
              </div>
            </Dialog>
          </Transition>

          <Transition show={showModal} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setShowModal}>
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </TransitionChild>

              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                      <div>
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                          <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                        </div>
                        <div className="mt-3 text-center sm:mt-5">
                          <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                            Add Event
                          </DialogTitle>
                          <form action="submit" onSubmit={handleSubmit}>
                            <div className="mt-2">
                              <input type="text" name="title" className="block w-full rounded-md border-0 py-1.5 text-gray-900 
                            shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                            focus:ring-2 
                            focus:ring-inset focus:ring-violet-600 
                            sm:text-sm sm:leading-6"
                                value={newEvent.title} onChange={(e) => handleChange(e)} placeholder="Title" />
                            </div>
                            <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                              <button
                                type="submit"
                                className="inline-flex w-full justify-center rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 sm:col-start-2 disabled:opacity-25"
                                disabled={newEvent.title === ''}
                              >
                                Create
                              </button>
                              <button
                                type="button"
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                                onClick={handleCloseModal}

                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </DialogPanel>
                  </TransitionChild>
                </div>
              </div>
            </Dialog>
          </Transition>
        </main>
      </nav>
    </>
  )
}

export default HomeComponent;