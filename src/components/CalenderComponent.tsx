// CalendarComponent.jsx
import React, { useState } from 'react';
import { ScheduleXCalendar, useCalendarApp } from '@schedule-x/react';
import { createViewWeek, createViewMonthGrid, CalendarApp } from '@schedule-x/calendar';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
import '@schedule-x/theme-default/dist/calendar.css';
import dayjs from 'dayjs'; // Install dayjs if not already installed


const CalendarComponent = ({ myEvents }) => {
    console.log(myEvents);
    const [Nevents, setEvents] = useState([
        {
            id: 1,
            title: 'Coffee with John',
            start: '2025-02-24 10:05',
            end: '2025-02-24 12:35',
            description: 'My First Date',
            link: 'https://meet.example.com/interview-12345',
        },
    ]);
    if(myEvents.length === 0){
        myEvents = Nevents
    }
    const transformEvents = (events) =>
        events.map((event, index) => ({
            id: index + 1, // Assign sequential IDs
            title: event.title,
            start: dayjs(event.start).format('YYYY-MM-DD HH:mm'), // Format start time
            end: dayjs(event.end).format('YYYY-MM-DD HH:mm'), // Format end time
            description: event.description,
        }));
    const events = transformEvents(myEvents);
    console.log(events, "events");
    const calendar: CalendarApp = useCalendarApp({
        views: [createViewWeek(), createViewMonthGrid()],
        events,
        plugins: [
            createEventModalPlugin({
                onRenderEventModal: (event) => (
                    <div>
                        <h3>{event.title}</h3>
                        <p>{event.description}</p>
                    </div>
                ),
            }),
            createDragAndDropPlugin(),
        ],
    });


    return <ScheduleXCalendar calendarApp={calendar} />;
};

export default CalendarComponent;
