import React, { useState } from 'react';
import axios from 'axios';
import { backendAddress, monthName } from './Helper';
import CalendarItem from './CalendarItem';
import './Calendar.css';

function Calendar({setTodoItems}) {
    const today = new Date();
    const [date, setDate] = useState(today.getDate());
    const [month, setMonth] = useState(today.getMonth());
    const [year, setYear] = useState(today.getFullYear());

    const changeDate = (y, m, d) => {
        // console.log(`chageDate(${y}, ${m}, ${d})`);
        setYear(y);
        setMonth(m);
        setDate(d);
        axios.get(`${backendAddress}/todo/all/${y}-${monthName[m]}-${d}`)
        .then(res => {
            setTodoItems(res.data);
        });
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

    const getCounts = async (y, m, d) => {
        const cntApi = `${backendAddress}/todo/cnt/${y}-${monthName[m]}-${d}`;
        const cntdoneApi = `${backendAddress}/todo/cntdone/${y}-${monthName[m]}-${d}`;
        try {
            const cnt = await axios.get(cntApi);
            const cntDone = await axios.get(cntdoneApi);
            return {cnt: cnt, cntdone: cntDone};
        } catch(err) {
            return null;
        }
    };
    
    const getDates = () => {
        // console.log(`getDates(${year}, ${month})`);
        const prevInfo = getInfo(year, month);
        const curInfo = getInfo(year, month + 1);
        const nextInfo = getInfo(year, month + 2);

        let prevDates;
        if (prevInfo.day !== 6) prevDates = [...Array(prevInfo.day + 1).keys()].map(e => e + prevInfo.date - prevInfo.day);
        else prevDates = [];
        const curDates = [...Array(curInfo.date).keys()].map(e => e + 1);
        const nextDates = [...Array(42 - curInfo.date - prevDates.length).keys()].map(e => e + 1);

        const result = [];
        let i, key = 0;
        for (i = 0; i < prevDates.length; ++i, ++key)
            result.push(<CalendarItem
                key={key}
                year={prevInfo.year}
                month={prevInfo.month}
                date={prevDates[i]}
                isCurMonth={false}
                curDate={-1}
                changeDate={changeDate}
                getCounts={getCounts}
            />);
        for (i = 0; i < curDates.length; ++i, ++key)
            result.push(<CalendarItem
                key={key}
                year={curInfo.year}
                month={curInfo.month}
                date={curDates[i]}
                isCurMonth={true}
                curDate={date}
                changeDate={changeDate}
                getCounts={getCounts}
            />);
        for (i = 0; i < nextDates.length; ++i, ++key)
            result.push(<CalendarItem
                key={key}
                year={nextInfo.year}
                month={nextInfo.month}
                date={nextDates[i]}
                isCurMonth={false}
                curDate={-1}
                changeDate={changeDate}
                getCounts={getCounts}
            />);

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
                {getDates()}
            </div>
        </div>
    )
}

export default React.memo(Calendar);
