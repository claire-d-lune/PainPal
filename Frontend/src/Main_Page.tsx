import React, { useState, useEffect } from 'react';
import EventRecords from './components/EventRecords'

export default function MainPage() {
    const [events, setEvents] = useState([])// <- most likely passed in as props from App.tsx
    const [weatherData, setWeatherData] = useState([])
    const [errors, setErrors] = useState([])// <- also most likely passed in as a prop, if needed

    //useEffect to fetch user eventRecords from local API
    //most likely this will live in App.tsx and user data will get passed as props to this page after login
    useEffect(() => {
        fetch('/API')
            .then((res) => {
                if (res.ok) {
                    res.json()
                        .then((data) => {
                            setEvents(data)
                            fetchWeatherData() // <- Callback function for weather data if we don't want 2 useEffects
                        })
                }
            })
    }, [])
    // Do we want to try TWO useEffect's to fetch weather data from API?
    useEffect(() => {
        fetch('/WEATHER_API')
            .then((res) => {
                if (res.ok) {
                    res.json()
                        .then((data) => {
                            setWeatherData(data)
                        })
                }
            })
    })
    // OR a function that runs automatically when the first useEffect is called, like above?
    const fetchWeatherData = () => {
        fetch('/WEATHER_API')
            .then(res => {
                if (res.ok) {
                    res.json()
                        .then(setWeatherData)
                } else {
                    res.json()
                        .then(data => setErrors(data.error))
                }
            })
    }
    // what are the pros/cons of 2 useEffect's vs. using a callback function?

    //filter for eventRecords by DATE, SEVERITY, WEATHER CONDITIONS
    //SOURCE: https://www.freecodecamp.org/news/how-to-make-a-filter-component-in-react/
    //this could be trash...😅
    const eventFilteringFunc = (currentEvent) => {
        const filteredEvents = events.filter((event) => {
            return event.date === currentEvent;
        })
        setEvents(filteredEvents)
    }

    //sorting algorithm by event date : NEWEST -> OLDEST
    //DOES NOT ACCOUNT FOR INCOMPLETE ENTRIES
    const sortedEvents = (events.slice(0).sort((a, b) => a.date.localeCompare(b.date))).reverse()

    //mapping function to create eventRecord cards
    const eventRecords = sortedEvents.map(event => {
        <EventRecords
            key={event.id}
            event={event}
        />
    })

    return (
        <>
            <div className="dashboard-display-container">
                <button>{"add a new migraine event -> leads to migraine form"}</button>
                <button>{"I AM HAVING A MIGRAINE RIGHT NOW -> submits a `blank` event record w/date & time prefilled"}</button>

                <div>
                    {weatherData}
                </div>
            </div>
            {/* Do list items work for rendering card components? I feel like there's a cleaner solution but I could be wrong */}
            <div className="event-record-container">
                <button>
                    {<DateFilterButton filter={eventFilteringFunc} />}
                </button>
                <button>
                    {<SeverityFilterButton filter={eventFilteringFunc} />}
                </button>
                <button>
                    {<WeatherFilterButton filter={eventFilteringFunc} />}
                </button>

                {eventRecords}
            </div>
        </>
    )
}