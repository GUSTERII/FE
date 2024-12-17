import React, { useState } from 'react';
import '../styles/CalendarSection.css';

const CalendarSection = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const daysOfWeek = ['Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă', 'Duminică'];
  const hours = Array.from({ length: 13 }, (_, i) => `${i + 8}:00`); // Orele de la 8:00 la 20:00

  // Returnează numărul de zile dintr-o lună
  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  // Gestionăm schimbarea lunii
  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Zilele din luna curentă
  const daysInCurrentMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

  // Construim zilele afișate în calendar
  const calendarDays = [];
  const previousMonthDays =
    currentMonth === 0
      ? getDaysInMonth(11, currentYear - 1)
      : getDaysInMonth(currentMonth - 1, currentYear);

  // Zilele din luna precedentă
  for (let i = previousMonthDays - (firstDayIndex === 0 ? 6 : firstDayIndex - 1); i <= previousMonthDays; i++) {
    calendarDays.push({ day: i, isCurrentMonth: false });
  }

  // Zilele din luna curentă
  for (let i = 1; i <= daysInCurrentMonth; i++) {
    calendarDays.push({ day: i, isCurrentMonth: true });
  }

  // Zilele din luna următoare
  const nextMonthDays = 42 - calendarDays.length; // 42 = 6 săptămâni afișate complet
  for (let i = 1; i <= nextMonthDays; i++) {
    calendarDays.push({ day: i, isCurrentMonth: false });
  }

  const isToday = (day) =>
    day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();

  return (
    <div className="calendar-container">
      {/* Sidebar */}
      <div className="menu-container">
        <div className="menu-header">
          <h2>
            {new Date(currentYear, currentMonth).toLocaleString('ro-RO', {
              month: 'long',
              year: 'numeric',
            })}
          </h2>
          <div>
            <button onClick={handlePreviousMonth}>{'<'}</button>
            <button onClick={handleNextMonth}>{'>'}</button>
          </div>
        </div>
        <div className="calendar-mini">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="day-header">
              {day.slice(0, 3)}
            </div>
          ))}
          {calendarDays.map((date, index) => (
            <div
              key={index}
              className={`${
                date.isCurrentMonth
                  ? isToday(date.day)
                    ? 'current-day'
                    : ''
                  : 'inactive-day'
              }`}
            >
              {date.day}
            </div>
          ))}
        </div>
      </div>

      {/* Calendar principal */}
      <div className="calendar-main">
      <header className="calendar-main-header">
  <div className="hour-label"></div> {/* Coloană goală pentru ore */}
  {daysOfWeek.map((day, index) => (
    <div key={index} className="main-day-header">
      {day}
    </div>
  ))}
</header>

        <div className="calendar-main-grid">
          {hours.map((hour, index) => (
            <React.Fragment key={index}>
              <div className="hour-label">{hour}</div>
              {Array.from({ length: 7 }).map((_, dayIndex) => (
                <div
                  key={`${index}-${dayIndex}`}
                  className="calendar-cell"
                ></div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarSection;
