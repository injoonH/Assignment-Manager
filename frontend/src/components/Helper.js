export const backendAddress = 'http://ssal.sparcs.org:38000';

export const monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const getCurDate = () => {
    const calendarHeader = document.getElementsByClassName('calendar__header__date')[0].innerText;
    const curCalendarItem = document.getElementsByClassName('calendar__body__item__date-cur')[0];
    const curDate = curCalendarItem.getElementsByClassName('calendar__body__item__date')[0].innerText;
    const date = calendarHeader.replace(/\s/g, '-') + '-' + curDate;
    return date;
};