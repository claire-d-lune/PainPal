import { useState, useEffect } from 'react';
import EventRecords from './components/EventRecords'

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

    //sorting algorithm by event date : NEWEST -> OLDEST
    //DOES NOT ACCOUNT FOR INCOMPLETE ENTRIES
    const sortedEvents = (events.slice(0).sort((a, b) => a.date.localeCompare(b.date))).reverse()

    //filter for eventRecords by DATE, SEVERITY, WEATHER CONDITIONS, INCOMPLETE


    //mapping function to create event record cards
    const eventRecords = sortedEvents.map(event => {
        <EventRecords
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

            {/* Do list items work for rendering card components? I feel like there's a cleaner solution but I could be wrong */}
            <ul>
                <li>
                    {eventRecords}
                </li>
            </ul>
        </>
    )
}