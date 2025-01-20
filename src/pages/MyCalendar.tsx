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
        views: [
            createViewWeek(),
            createViewMonthGrid(),
        ],
        events,
        selectedDate: '2025-02-02',
        plugins: [
            createEventModalPlugin({
                onRenderEventModal: (event) => {
                    return (
                        <div>
                            <h3>{event.title}</h3>
                            <p>{event.description}</p>
                            <p>
                                <a href={event.link} target="_blank" rel="noopener noreferrer">
                                    Join Event
                                </a>
                            </p>
                        </div>
                    );
                },
            }),
            createDragAndDropPlugin(),
        ],
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddEvent = () => {
        const eventToAdd = {
            ...newEvent,
            id: events.length + 1, // Assign a unique ID
        };

        // Validate required fields
        if (!newEvent.title || !newEvent.start || !newEvent.end) {
            alert('Please fill in the required fields (title, start, end).');
            return;
        }

        // Add the new event
        setEvents((prev) => [...prev, eventToAdd]);

        // Clear the form
        setNewEvent({
            title: '',
            start: '',
            end: '',
            description: '',
            link: '',
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
            <div className="gap-4 p-4 md:p-10">

                <h2>My Calendar</h2>
                {/* Event Creation Form */}
                <div style={{ marginBottom: '20px' }}>
                    <h3>Add New Event</h3>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={newEvent.title}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="datetime-local"
                        name="start"
                        placeholder="Start Date & Time"
                        value={newEvent.start}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="datetime-local"
                        name="end"
                        placeholder="End Date & Time"
                        value={newEvent.end}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={newEvent.description}
                        onChange={handleInputChange}
                    />
                    <input
                        type="url"
                        name="link"
                        placeholder="Interview Link"
                        value={newEvent.link}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleAddEvent}>Add Event</button>
                </div>
            </div>
            {/* Calendar */}
            <ScheduleXCalendar calendarApp={calendar} />
        </div>
    );
}

export default MyCalendar;
