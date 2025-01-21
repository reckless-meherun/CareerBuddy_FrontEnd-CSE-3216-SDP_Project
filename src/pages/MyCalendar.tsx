import React, { useState } from 'react';
import { ScheduleXCalendar, useCalendarApp } from '@schedule-x/react';
import { CalendarApp, createViewWeek, createViewMonthGrid } from '@schedule-x/calendar';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
import '@schedule-x/theme-default/dist/calendar.css';

function MyCalendar() {
    const [events, setEvents] = useState([
        {
            id: 1,
            title: 'Coffee with John',
            start: '2025-02-02 10:05',
            end: '2025-02-02 12:35',
            description: 'My First Date',
            link: 'https://meet.example.com/interview-12345',
        },
    ]);

    const [newEvent, setNewEvent] = useState({
        title: '',
        start: '',
        end: '',
        description: '',
        link: '',
    });

    const calendar: CalendarApp = useCalendarApp({
        views: [createViewWeek(), createViewMonthGrid()],
        events,
        selectedDate: '2025-02-02',
        plugins: [
            createEventModalPlugin({
                onRenderEventModal: (event) => (
                    <div>
                        <h3>{event.title}</h3>
                        <p>{event.description}</p>
                        <p>
                            <a href={event.link} target="_blank" rel="noopener noreferrer">
                                Join Event
                            </a>
                        </p>
                    </div>
                ),
            }),
            createDragAndDropPlugin(),
        ],
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddEvent = () => {
        if (!newEvent.title || !newEvent.start || !newEvent.end) {
            alert('Please fill in the required fields (title, start, end).');
            return;
        }

        const eventToAdd = {
            ...newEvent,
            id: events.length + 1,
        };

        setEvents((prev) => [...prev, eventToAdd]);
        setNewEvent({ title: '', start: '', end: '', description: '', link: '' });
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-4 md:p-10">
            {/* Removed max-w-4xl to allow full width */}
            <div className="w-full bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 space-y-6">
                <h2 className="text-2xl font-bold text-teal-500">My Calendar</h2>

                {/* Event Creation Form */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Add New Event</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={newEvent.title}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
                            required
                        />
                        <input
                            type="datetime-local"
                            name="start"
                            placeholder="Start Date & Time"
                            value={newEvent.start}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
                            required
                        />
                        <input
                            type="datetime-local"
                            name="end"
                            placeholder="End Date & Time"
                            value={newEvent.end}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="description"
                            placeholder="Description"
                            value={newEvent.description}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
                        />
                        <input
                            type="url"
                            name="link"
                            placeholder="Interview Link"
                            value={newEvent.link}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            onClick={handleAddEvent}
                            className="px-6 py-4 text-white bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
                        >
                            Add Event
                        </button>
                    </div>
                </div>
            </div>

            {/* Calendar */}
            <div className="mt-10">
                <ScheduleXCalendar calendarApp={calendar} />
            </div>
        </div>
    );
}

export default MyCalendar;