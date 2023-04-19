import { useState } from 'react';

export default function MainPage(any: props) {
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