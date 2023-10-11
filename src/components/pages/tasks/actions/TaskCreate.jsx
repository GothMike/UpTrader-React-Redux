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
  const [dateDifference, setDateDifference] = useState(null);

  const modalCreateActive = useSelector((state) => state.projects.modalCreateActive);
  const modalCreateSuccess = useSelector((state) => state.projects.modalCreateSuccess);

  const handleDateDataChange = (timeStart, timeEnd, dateDifference) => {
    setTimeStart(timeStart);
    setTimeEnd(timeEnd);
    setDateDifference(dateDifference);
  };

  const SuccessModal = modalCreateSuccess ? (
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
    setDescription("");
    setPriority(false);
    setFiles([]);
    setTimeStart("");
    setTimeEnd("");
    setDateDifference("");
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
              <h2 className="modal__title">Создание задачи</h2>
              <div
                onClick={() => dispatch(toogleModal(modalCreateActive))}
                className="modal__close"
              >
                &times;
              </div>
              <div className="modal__wrapper">
                <label htmlFor="title">Название задачи</label>
                <input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  name="title"
                  className="modal__input"
                  id="name"
                  placeholder="Введите название задачи"
                  disabled={!modalCreateActive}
                />
                <label htmlFor="descr">Описание задачи</label>
                <input
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                  name="descr"
                  className="modal__input"
                  id="name"
                  placeholder="Введите описание задачи"
                  disabled={!modalCreateActive}
                />
                <label htmlFor="checkbox">Поставить высокий приоритет задачи?</label>
                <input
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  type="checkbox"
                  name="checkbox"
                  className="modal__input"
                  id="name"
                  placeholder="Введите описание задачи"
                  disabled={!modalCreateActive}
                />
                <label htmlFor="files">Вложенные файлы</label>
                <input
                  value={files}
                  onChange={(e) => setFiles(e.target.value)}
                  type="file"
                  name="files"
                  className="modal__input"
                  id="name"
                  placeholder="Введите описание задачи"
                  disabled={!modalCreateActive}
                />
                <label htmlFor="files">Выберите даты работы с задачей</label>
                <DateInput onDatesChange={handleDateDataChange} />
              </div>

              <button type="submit" className="button">
                Создать
              </button>
            </form>
          </div>
          <div
            onClick={() => dispatch(toogleModal(modalCreateActive))}
            className={`modal__overlay ${overlayActive}`}
          ></div>
        </>,
        document.body
      )}

      {SuccessModal}
    </>
  );
};

export default TaskCreate;
