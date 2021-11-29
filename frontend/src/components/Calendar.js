import React, { useState } from 'react';
import CalendarItem from './CalendarItem';
import './Calendar.css';

export default function Calendar() {
    const date = new Date();
    const [year, setYear] = useState(date.getFullYear());
    const [month, setMonth] = useState(date.getMonth());
    const monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const getDates = (y, m) => {
        const prev = new Date(y, m, 0);
        const cur = new Date(y, m + 1, 0);
        const next = new Date(y, m + 2, 0);

        const prevInfo = {
            year: prev.getFullYear(),
            month: prev.getMonth(),
            date: prev.getDate(),
            day: prev.getDay()
        };
        const curInfo = {
            year: cur.getFullYear(),
            month: cur.getMonth(),
            date: cur.getDate(),
            day: cur.getDay()
        };
        const nextInfo = {
            year: next.getFullYear(),
            month: next.getMonth(),
            date: next.getDate(),
            day: next.getDay()
        };

        let prevDates;
        if (prevInfo.day !== 6) prevDates = [...Array(prevInfo.day + 1).keys()].map(e => e + prevInfo.date - prevInfo.day);
        else prevDates = [];
        const curDates = [...Array(curInfo.date).keys()].map(e => e + 1);
        const nextDates = [...Array(42 - curInfo.date - prevDates.length).keys()].map(e => e + 1);

        const result = [];
        for (let i = 0; i < prevDates.length; ++i)
            result.push(CalendarItem(prevInfo.year, prevInfo.month, prevDates[i], false));
        for (let i = 0; i < curDates.length; ++i)
            result.push(CalendarItem(curInfo.year, curInfo.month, curDates[i], true));
        for (let i = 0; i < nextDates.length; ++i)
            result.push(CalendarItem(nextInfo.year, nextInfo.month, nextDates[i], false));

        return result;
    };

    const toPrevMonth = () => {
        const prev = new Date(year, month, 0);
        setYear(prev.getFullYear());
        setMonth(prev.getMonth());
    };

    const toNextMonth = () => {
        const next = new Date(year, month + 2, 0);
        setYear(next.getFullYear());
        setMonth(next.getMonth());
    };

    return (
        <div className="calendar">
            <div className="calendar__header">
                <i className="fas fa-caret-left calendar__header__arrow" onClick={toPrevMonth}></i>
                <span className="calendar__header__date">{year} {monthName[month]}</span>
                <i className="fas fa-caret-right calendar__header__arrow" onClick={toNextMonth}></i>
            </div>
            <div className="calendar__body">
                <div className="calendar__body__day" style={{color: "#ff3399"}}><span>Sun</span></div>
                <div className="calendar__body__day"><span>Mon</span></div>
                <div className="calendar__body__day"><span>Tue</span></div>
                <div className="calendar__body__day"><span>Wed</span></div>
                <div className="calendar__body__day"><span>Thu</span></div>
                <div className="calendar__body__day"><span>Fri</span></div>
                <div className="calendar__body__day" style={{color: "#0099ff"}}><span>Sat</span></div>
                {getDates(year, month)}
            </div>
        </div>
    )
}
