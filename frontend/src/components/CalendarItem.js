import React from 'react';
import './CalendarItem.css';

export default function CalendarItem(props) {
    let dateClass = 'calendar__body__item__date', itemClass = 'calendar__body__item';
    if (!props.isCurMonth) dateClass += ' calendar__body__item__date-not-cur-month';
    if (props.date === props.curDate) itemClass += ' calendar__body__item__date-cur';

    return (
        <div className={itemClass} onClick={() => {props.changeDate(props.year, props.month, props.date)}}>
            <span className={dateClass}>{props.date}</span>
        </div>
    )
}
