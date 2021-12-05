import React, { useEffect ,useState } from 'react';
import './CalendarItem.css';

export default function CalendarItem(props) {
    let dateClass = 'calendar__body__item__date', itemClass = 'calendar__body__item';
    if (!props.isCurMonth) dateClass += ' calendar__body__item__date-not-cur-month';
    if (props.date === props.curDate) itemClass += ' calendar__body__item__date-cur';

    const [count, setCount] = useState(0);
    const [countdone, setCountdone] = useState(0);

    const updateCount = () => {
        props.getCounts(props.year, props.month, props.date)
        .then(res => {
            setCount(res.cnt.data);
            setCountdone(res.cntdone.data)
        });
    };

    useEffect(() => {updateCount()});

    const countItem = () => {
        if (count === 0) return null;
        if (count === countdone)
            return (<i className="fas fa-check calendar__body__item__count"></i>)
        return (<span className="calendar__body__item__count">{`${countdone}/${count}`}</span>)
    }

    return (
        <div className={itemClass} onClick={() => {props.changeDate(props.year, props.month, props.date)}}>
            <span className={dateClass}>{props.date}</span>
            {countItem()}
        </div>
    )
}
