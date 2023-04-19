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

    //filter for eventRecords by DATE, SEVERITY(color), WEATHER, INCOMPLETE

    const eventRecords = events.map(event => {
        <Event
            key={event.id}
        />
    })

    return (
        <ul>
            <li>
                {eventRecords}
            </li>
        </ul>
    )
}