// MyCalendar.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import CalendarComponent from '@/components/CalenderComponent';// Import the new component
import { useMeetingApi } from '@/hooks/useMeetingApi';
import useApplyForJob from '@/hooks/useApplyForJob';
import { useJobPost } from '@/hooks/useJobPost';

function MyCalendar() {
    const location = useLocation();
    const applicationId = location.state?.applicationId;
    const userId = location.state?.userId || '';
    const [events, setEvents] = useState([]);
    const [jobApplications, setJobApplications] = useState([]);
    const [isEventFetched, setIsEventFetched] = useState(false);
    const [isJobApplicationsFetched, setIsJobApplicationsFetched] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: '',
        start: '',
        end: '',
        description: '',
        jobApplicationId: applicationId,
    });

    // Hooks
    const { useAddmeetings, getMeeting } = useMeetingApi();
    const { useGetAppliedlJobs, usegetJobApplication } = useApplyForJob();
    const { useGetJobPosts } = useJobPost();

    // Fetch meetings
    const fetchMeetings = useCallback(async () => {
        if (!userId) return;
        try {
            // Fetch meetings for the user
            const response = await getMeeting(userId);

            // Map and fetch additional details for each meeting
            const fetchedEvents = await Promise.all(
                response.map(async (meeting) => {
                    try {
                        // Fetch the job application details
                        const application = await usegetJobApplication(meeting.jobApplicationId);

                        // Fetch the job post details
                        const jobPost = application
                            ? await useGetJobPosts(application.jobId)
                            : null;

                        return {
                            id: meeting.id,
                            title: jobPost
                                ? `Job: ${jobPost.title} ${jobPost.company.companyName} - Meeting`
                                : `Meeting - ${meeting.id}`,
                            start: meeting.startTime,
                            end: meeting.endTime,
                            description: jobPost
                                ? `Job Title: ${jobPost.title} \nCompnay Name: ${jobPost.company.companyName}\n Job Description: ${jobPost.description || 'N/A'} `
                                : `Job Description: ${jobPost.description || 'N/A'}`,
                        };
                    } catch (error) {
                        console.error(`Error fetching details for meeting ${meeting.id}:`, error);
                        return {
                            id: meeting.id,
                            title: `Meeting - ${meeting.id}`,
                            start: meeting.startTime,
                            end: meeting.endTime,
                            description: `Job Application ID: ${meeting.jobApplicationId || 'N/A'}`,
                        };
                    }
                })
            );

            // Update the state with the enriched events
            setEvents(fetchedEvents);
        } catch (error) {
            console.error('Error fetching meetings:', error);
            toast.error('Failed to fetch meetings. Please try again.');
        }
    }, [getMeeting, userId, usegetJobApplication, useGetJobPosts]);

    useEffect(() => {
        if (!isEventFetched) {
            fetchMeetings();
            setIsEventFetched(true);
        }
    }, [fetchMeetings, isEventFetched, setIsEventFetched]);

    // Fetch applied jobs
    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const appliedJobs = await useGetAppliedlJobs();
                const detailedJobs = await Promise.all(
                    appliedJobs.map(async (job) => await useGetJobPosts(job.jobId))
                );
                setJobApplications(detailedJobs);
            } catch (error) {
                console.error('Error fetching applied jobs:', error);
                toast.error('Failed to fetch applied jobs. Please try again.');
            }
        };
        if (!isJobApplicationsFetched) {
            fetchAppliedJobs();
            setIsJobApplicationsFetched(true);
        }
    }, [useGetAppliedlJobs, useGetJobPosts, isJobApplicationsFetched, setIsJobApplicationsFetched]);

    // Handle form changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent((prev) => ({ ...prev, [name]: value }));
    };

    // Add new event
    const handleAddEvent = async () => {
        const { title, start, end, jobApplicationId } = newEvent;

        if (!title || !start || !end) {
            toast.error('Please fill in all required fields (title, start, end).');
            return;
        }

        if (!jobApplicationId) {
            toast.error('A job application must be selected.');
            return;
        }

        try {
            const requestData = {
                userId,
                jobApplicationId,
                startTime: start,
                endTime: end,
            };

            const response = await useAddmeetings(requestData);
            if (response) {
                toast.success('Meeting created successfully.');
                setNewEvent({ title: '', start: '', end: '', description: '', jobApplicationId: '' });
                fetchMeetings(); // Refresh calendar events
            }
        } catch (error) {
            console.error('Error creating meeting:', error);
            toast.error('Failed to create meeting. Please try again.');
        }
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-800 p-4 md:p-10 min-h-screen text-gray-800 dark:text-gray-100">
            <div className="space-y-6 bg-white dark:bg-gray-700 shadow-md p-6 rounded-lg w-full">
                <h2 className="font-bold text-2xl text-teal-500">My Calendar</h2>

                {/* Event Creation Form */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-gray-700 text-lg dark:text-gray-300">Add New Event</h3>
                    <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={newEvent.title}
                            onChange={handleInputChange}
                            className="dark:border-gray-600 dark:bg-gray-800 px-4 py-2 border rounded-lg"
                        />
                        <input
                            type="datetime-local"
                            name="start"
                            value={newEvent.start}
                            onChange={handleInputChange}
                            className="dark:border-gray-600 dark:bg-gray-800 px-4 py-2 border rounded-lg"
                        />
                        <input
                            type="datetime-local"
                            name="end"
                            value={newEvent.end}
                            onChange={handleInputChange}
                            className="dark:border-gray-600 dark:bg-gray-800 px-4 py-2 border rounded-lg"
                        />
                    </div>
                    <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                        <select
                            name="jobApplicationId"
                            value={newEvent.jobApplicationId}
                            onChange={handleInputChange}
                            disabled={!!applicationId} // Disable if applicationId is present
                            className={`dark:border-gray-600 dark:bg-gray-800 px-4 py-2 border rounded-lg ${applicationId ? 'bg-gray-200 cursor-not-allowed' : ''
                                }`}
                        >
                            <option value="">Select Job Application</option>
                            {jobApplications.map((job) => (
                                <option key={job.id} value={job.id}>
                                    {job.title} (ID: {job.id})
                                </option>
                            ))}
                        </select>

                        <input
                            type="text"
                            name="description"
                            placeholder="Description"
                            value={newEvent.description}
                            onChange={handleInputChange}
                            className="dark:border-gray-600 dark:bg-gray-800 px-4 py-2 border rounded-lg"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            onClick={handleAddEvent}
                            className="bg-gradient-to-r from-teal-500 to-blue-500 px-6 py-4 rounded-lg text-white transform transition hover:scale-105"
                        >
                            Add Event
                        </button>
                    </div>
                </div>
            </div>

            {/* Calendar */}
            {events.length > 0 &&
                <div className="mt-10">
                    <CalendarComponent myEvents={events} />
                </div>

            }
        </div>
    );
}

export default MyCalendar;
