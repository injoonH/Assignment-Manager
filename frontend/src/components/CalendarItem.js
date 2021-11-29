import React from 'react';
import './CalendarItem.css';

export default function CalendarItem(year, month, date, isCur) {
    const dayType = 'calendar__body__item__date ' +  (isCur ? 'day-cur' : 'day-not-cur');
    return (
        <div className="calendar__body__item">
            <span className={dayType}>{date}</span>
        </div>
    )
}
