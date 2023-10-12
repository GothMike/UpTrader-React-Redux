import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toogleModal } from "../../../../redux/actions/modalActions";
import { taskCreated } from "../../../../redux/actions/taskActions";
import { createPortal } from "react-dom";
import DateInput from "../../../dateInput/DateInput";

const TaskCreate = ({ id }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(false);
  const [files, setFiles] = useState([]);
  const [timeStart, setTimeStart] = useState();
  const [timeEnd, setTimeEnd] = useState();
  const [dateDifference, setDateDifference] = useState();

  const modalCreateActive = useSelector((state) => state.projects.modalCreateActive);
  const modalCreateSuccess = useSelector((state) => state.projects.modalCreateSuccess);

  const handleDateDataChange = (timeStart, timeEnd, dateDifference) => {
    setTimeStart(timeStart);
    setTimeEnd(timeEnd);
    setDateDifference(dateDifference);
  };

  const successModal = modalCreateSuccess ? (
    <div className="modal__success">Успешно создано!</div>
  ) : null;

  const modalActive = modalCreateActive ? "modal_active" : "";
  const overlayActive = modalCreateActive ? "modal__overlay_active" : "";

  const handleEscKey = (event) => {
    if (event.key === "Escape" && modalCreateActive) {
      dispatch(toogleModal(modalCreateActive));
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleEscKey);
    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
    // eslint-disable-next-line
  }, []);
  const onCreate = (e) => {
    e.preventDefault();
    const newTask = {
      isQueue: true,
      isDevelopment: false,
      isDone: false,
      title: title,
      description: description,
      timeOfWork: dateDifference,
      dateStart: timeStart,
      dateEnd: timeEnd,
      priority: priority,
      attachedFiles: files,
      subTasks: [],
      comments: [],
      ProjectId: id.taskId,
    };

    dispatch(taskCreated(newTask, id.taskId));
    dispatch(toogleModal(modalCreateActive));
    setTitle("");
    setDescription("");
    setFiles([]);
    setTimeStart(null);
    setTimeEnd(null);
    setDateDifference("");
    setPriority(false);
  };

  return (
    <>
      <button onClick={() => dispatch(toogleModal())} className="button">
        Создать
      </button>
      {createPortal(
        <>
          <div className={`modal modal_task ${modalActive}`}>
            <form onSubmit={(e) => onCreate(e)} className={`modal__form `}>
              <div className="modal__header">
                <h2 className="modal__title">Создание задачи</h2>
                <div
                  onClick={() => dispatch(toogleModal(modalCreateActive))}
                  className="modal__close"
                >
                  &times;
                </div>
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
                    placeholder="Введите название задачи"
                    disabled={!modalCreateActive}
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
                    placeholder="Введите описание задачи"
                    disabled={!modalCreateActive}
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
                    disabled={!modalCreateActive}
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
                    disabled={!modalCreateActive}
                  />
                </div>
                <div className="modal__buttons">
                  <button
                    disabled={!modalCreateActive}
                    onClick={() => dispatch(toogleModal(modalCreateActive))}
                    type="submit"
                    className="button button_modal_close"
                  >
                    Отменить
                  </button>
                  <button
                    disabled={!modalCreateActive}
                    type="submit"
                    className="button button_modal"
                  >
                    Создать
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div
            onClick={() => dispatch(toogleModal(modalCreateActive))}
            className={`modal__overlay ${overlayActive}`}
          ></div>
        </>,
        document.body
      )}

      {successModal}
    </>
  );
};

export default TaskCreate;
