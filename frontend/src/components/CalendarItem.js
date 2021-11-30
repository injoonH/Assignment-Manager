import React from 'react';
import './CalendarItem.css';

export default function CalendarItem(year, month, date, isCurMonth, curDate, changeDate) {
    let dateClass = 'calendar__body__item__date', itemClass = 'calendar__body__item';
    if (!isCurMonth) dateClass += ' calendar__body__item__date-not-cur-month';
    if (date === curDate) itemClass += ' calendar__body__item__date-cur';

    return (
        <div className={itemClass} onClick={() => {changeDate(year, month, date)}}>
            <span className={dateClass}>{date}</span>
        </div>
    )
}
