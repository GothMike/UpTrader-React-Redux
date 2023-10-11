import { differenceInDays } from "date-fns";
import { useEffect, useState } from "react";

const DateInput = ({ onDatesChange }) => {
  const [timeStart, setTimeStart] = useState();
  const [timeEnd, setTimeEnd] = useState();
  const [dateDifference, setDateDifference] = useState(null);

  useEffect(() => {
    handleDateChange();
  }, [timeStart, timeEnd]);

  const handleDateChange = () => {
    if (timeStart && timeEnd) {
      const startDate = new Date(timeStart);
      const endDate = new Date(timeEnd);
      const daysDifference = differenceInDays(endDate, startDate);
      setDateDifference(daysDifference);
      onDatesChange(timeStart, timeEnd, dateDifference);
    } else {
      setDateDifference(null);
    }
  };

  return (
    <>
      <div className="date-input">
        <div className="date-input__wrapper">
          <label htmlFor="startDate">Введите начальную дату</label>
          <input
            required
            type="date"
            id="start"
            name="startDate"
            value={timeStart}
            min="2023-10-09"
            max="2023-12-31"
            onChange={(e) => {
              setTimeStart(e.target.value);
              handleDateChange();
            }}
          />
        </div>
        <div className="date-input__wrapper">
          <label htmlFor="endDate">Введите окончательную дату</label>
          <input
            required
            type="date"
            id="end"
            name="endDate"
            value={timeEnd}
            min="2023-10-09"
            max="2023-12-31"
            onChange={(e) => {
              setTimeEnd(e.target.value);
              handleDateChange();
            }}
          />
        </div>

        {dateDifference !== null && <div>Разница в днях: {dateDifference} дней</div>}
      </div>
    </>
  );
};

export default DateInput;
