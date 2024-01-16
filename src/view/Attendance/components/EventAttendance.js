

import React, { useState, useEffect } from "react";
import axios from "axios";
import MarkAttendance from "./MarkAttendance";

const EventAttendance = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Fetch events data from the API
        axios
            .get("http://snmsangli.com/api/event/get_event")
            .then((response) => {
                const eventData = response.data;

                // Format the current date manually
                const currentDate = new Date();
                const day = currentDate.getDate().toString().padStart(2, "0");
                const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
                const year = currentDate.getFullYear();
                const formattedCurrentDate = `${day}-${month}-${year}`;

                // Filter events for the current date
                const currentEvents = eventData.filter(
                    (event) => event.event_date === formattedCurrentDate
                );
                setEvents(currentEvents);
            })
            .catch((error) => {
                console.error("Error fetching events data:", error);
            });
    }, []);

    return (
        <div>
            {events.length === 0 ? (
                <p>No events for today</p>
            ) : (
                <div className="">
                    {events.map((event) => (
                        <div key={event.id}>
                            <div className="grid gap-2 grid-cols-3">
                                <h4>Take Attandance for todays event</h4>

                                <div className="flex">
                                    <p className="font-bold">Event Name -  </p> <span className=""> {event.event_name}</span>
                                </div>
                                <div className="flex">
                                    <p className="font-bold"> Date - </p> <span>{event.event_date}</span>

                                </div>
                            </div>
                            <div className=" mt-4">
                                <MarkAttendance eventId={event.id} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EventAttendance;
