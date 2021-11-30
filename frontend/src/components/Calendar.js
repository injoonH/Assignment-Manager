import React, { useState } from 'react';
import CalendarItem from './CalendarItem';
import './Calendar.css';

export default function Calendar() {
    const today = new Date();
    const [date, setDate] = useState(today.getDate());
    const [month, setMonth] = useState(today.getMonth());
    const [year, setYear] = useState(today.getFullYear());
    const monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const changeDate = (y, m, d) => {
        setDate(d);
        setMonth(m);
        setYear(y);
    }

    const getInfo = (y, m) => {
        const d = new Date(y, m, 0);
        return {
            year: d.getFullYear(),
            month: d.getMonth(),
            date: d.getDate(),
            day: d.getDay()
        };
    }
    
    const getDates = (y, m) => {
        const prevInfo = getInfo(y, m);
        const curInfo = getInfo(y, m + 1);
        const nextInfo = getInfo(y, m + 2);

        let prevDates;
        if (prevInfo.day !== 6) prevDates = [...Array(prevInfo.day + 1).keys()].map(e => e + prevInfo.date - prevInfo.day);
        else prevDates = [];
        const curDates = [...Array(curInfo.date).keys()].map(e => e + 1);
        const nextDates = [...Array(42 - curInfo.date - prevDates.length).keys()].map(e => e + 1);

        const result = [];
        for (let i = 0; i < prevDates.length; ++i)
            result.push(CalendarItem(prevInfo.year, prevInfo.month, prevDates[i], false, -1, changeDate));
        for (let i = 0; i < curDates.length; ++i)
            result.push(CalendarItem(curInfo.year, curInfo.month, curDates[i], true, date, changeDate));
        for (let i = 0; i < nextDates.length; ++i)
            result.push(CalendarItem(nextInfo.year, nextInfo.month, nextDates[i], false, -1, changeDate));

        return result;
    };

    const toPrevMonth = () => {
        const prevInfo = getInfo(year, month);
        changeDate(prevInfo.year, prevInfo.month, prevInfo.date);
    };

    const toNextMonth = () => {
        const nextInfo = getInfo(year, month + 2);
        changeDate(nextInfo.year, nextInfo.month, 1);
    };

    return (
        <div className="calendar">
            <div className="calendar__header">
                <i className="fas fa-caret-left calendar__header__arrow" onClick={toPrevMonth}></i>
                <span className="calendar__header__date">{year} {monthName[month]}</span>
                <i className="fas fa-caret-right calendar__header__arrow" onClick={toNextMonth}></i>
            </div>
            <div className="calendar__body">
                <div className="calendar__body__day"><span className="calendar__body__day__sunday">Sun</span></div>
                <div className="calendar__body__day"><span>Mon</span></div>
                <div className="calendar__body__day"><span>Tue</span></div>
                <div className="calendar__body__day"><span>Wed</span></div>
                <div className="calendar__body__day"><span>Thu</span></div>
                <div className="calendar__body__day"><span>Fri</span></div>
                <div className="calendar__body__day"><span className="calendar__body__day__saturday">Sat</span></div>
                {getDates(year, month)}
            </div>
        </div>
    )
}
