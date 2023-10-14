import { differenceInDays, format } from "date-fns";
import { useEffect, useState } from "react";

const DateInput = ({ endTime, onDatesChange }) => {
  const currentDate = new Date();
  const formattedCurrentDate = format(currentDate, "yyyy-MM-dd");

  const [timeStart, setTimeStart] = useState(formattedCurrentDate);
  const [timeEnd, setTimeEnd] = useState();

  useEffect(() => {
    handleDateChange();
    // eslint-disable-next-line
  }, [timeStart, timeEnd]);

  const handleDateChange = () => {
    if (timeStart && timeEnd) {
      const startDate = new Date(timeStart);
      const endDate = new Date(timeEnd);
      const daysDifference = differenceInDays(endDate, startDate);
      onDatesChange(timeStart, timeEnd, daysDifference);
    }
  };

  return (
    <>
      <div className="modal__item">
        <label htmlFor="startDate">Введите начальную дату</label>
        <input
          required
          type="date"
          id="start"
          name="startDate"
          value={timeStart}
          min={formattedCurrentDate}
          max="2023-12-31"
          className="modal__input"
          onChange={(e) => {
            setTimeStart(e.target.value);
            handleDateChange();
          }}
        />
      </div>
      <div className="modal__item">
        <label htmlFor="endDate">Введите окончательную дату</label>
        <input
          required
          type="date"
          id="end"
          name="endDate"
          value={endTime}
          min={timeStart}
          max="2023-12-31"
          className="modal__input"
          onChange={(e) => {
            setTimeEnd(e.target.value);
            handleDateChange();
          }}
        />
      </div>
    </>
  );
};

export default DateInput;
