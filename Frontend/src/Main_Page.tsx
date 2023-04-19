import { useState, useEffect } from 'react';

export default function MainPage() {
    const [events, setEvents] = useState([])
    const [weatherData, setWeatherData] = useState([])
    const [errors, setErrors] = useState([])

    //useEffect to fetch user eventRecords from local API
    useEffect(() => {
        fetch('/API')
            .then((res) => {
                if (res.ok) {
                    res.json()
                        .then((data) => {
                            setEvents(data)
                            fetchWeatherData()
                        })
                }
            })
    }, [])
    // Do we want to try two useEffect's to fetch weather data from API?
    // OR just a function that runs automatically when the useEffect is called...
    // what are the pros/cons of either case?
    const fetchWeatherData = () => {
        fetch('WEATHER API')
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

    //sorting algorithm by event date : NEWEST -> OLDEST
    //DOES NOT ACCOUNT FOR INCOMPLETE ENTRIES
    const sortedEvents = (events.slice(0).sort((a, b) => a.date.localeCompare(b.date))).reverse()

    //filter for eventRecords by DATE, SEVERITY(color), WEATHER, INCOMPLETE


    const eventRecords = sortedEvents.map(event => {
        <Event
            key={event.id}
        />
    })

    return (
        <>
            <button>{"add a new migraine event : leads to migraine form"}</button>
            <button>{"I AM HAVING A MIGRAINE RIGHT NOW : to submit a `blank` event record with date & time prefilled"}</button>
            <div>
                {"weather forecast display"}
            </div>

            {/* How should card components appear? Do list items work? */}
            <ul>
                <li>
                    {eventRecords}
                </li>
            </ul>
        </>
    )
}