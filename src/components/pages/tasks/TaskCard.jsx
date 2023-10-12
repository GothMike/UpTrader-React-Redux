import { useState } from "react";
import DateInput from "../../dateInput/DateInput";
const TaskCard = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(false);
  const [files, setFiles] = useState([]);
  const [timeStart, setTimeStart] = useState();
  const [timeEnd, setTimeEnd] = useState();
  const [dateDifference, setDateDifference] = useState();

  const handleDateDataChange = (timeStart, timeEnd, dateDifference) => {
    setTimeStart(timeStart);
    setTimeEnd(timeEnd);
    setDateDifference(dateDifference);
  };

  return (
    <>
      <div className={`modal modal_task  }`}>
        <form className={`modal__form `}>
          <div className="modal__header">
            <h2 className="modal__title">Редактирование задачи</h2>
            <div className="modal__close">&times;</div>
          </div>

          <div className="modal__wrapper modal__wrapper_task">
            <div className="modal__item">
              <label htmlFor="title">Название задачи:</label>
              <input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                name="title"
                className="modal__input"
                id="text"
                placeholder={title}
              />
            </div>
            <div className="modal__item">
              <label htmlFor="descr">Описание задачи:</label>
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="textarea"
                name="descr"
                className="modal__input"
                id="descr"
                placeholder={description}
              />
            </div>

            <DateInput onDatesChange={handleDateDataChange} />
            <div className="modal__item">
              <label htmlFor="files">Вложенные файлы</label>
              <input
                value={files}
                onChange={(e) => setFiles(e.target.value)}
                type="file"
                name="files"
                className="modal__input"
                id="files"
              />
            </div>
          </div>

          <div className="modal__footer modal__footer_task">
            <div className="modal__item modal__item_checkbox">
              <label htmlFor="checkbox">Высокий приоритет?</label>
              <input
                value={priority}
                onChange={() => setPriority(!priority)}
                type="checkbox"
                name="checkbox"
                className="modal__input "
                id="checkbox"
              />
            </div>
            <div className="modal__buttons">
              <button
                // onClick={() => dispatch(toogleModal(modalCreateActive))}
                type="submit"
                className="button button_modal_close"
              >
                Отменить
              </button>
              <button type="submit" className="button button_modal">
                Создать
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* <div
        onClick={() => dispatch(toogleModal(modalCreateActive))}
        className={`modal__overlay ${overlayActive}`}
      ></div> */}
    </>
  );
};

export default TaskCard;
