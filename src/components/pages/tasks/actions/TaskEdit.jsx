import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTasks } from "../../../../redux/actions/taskActions";
import { createPortal } from "react-dom";
import Change from "../../../../assets/Change.svg";
import DateInput from "../../../dateInput/DateInput";

const TaskEdit = ({ task }) => {
  const { id, title, description, priority, ProjectId, isQueue, isDevelopment, isDone } = task;

  const dispatch = useDispatch();
  const [portalVisible, setPortalVisible] = useState(false);
  const [updTitle, setUpdTitle] = useState(title);
  const [updDescription, setUpdDescription] = useState(description);
  const [updPriority, setUpdPriority] = useState(priority);
  const [files, setFiles] = useState([]);
  const [updTimeStart, setUpdTimeStart] = useState();
  const [updTimeEnd, setUpdTimeEnd] = useState();
  const [updDateDifference, setUpdDateDifference] = useState();

  const modalActive = portalVisible ? "modal_active" : "";
  const overlayActive = portalVisible ? "modal__overlay_active" : "";

  const handleEscKey = (event) => {
    if (event.key === "Escape" && portalVisible) {
      setPortalVisible(!portalVisible);
    }
  };

  const handleDateDataChange = (timeStart, timeEnd, dateDifference) => {
    setUpdTimeStart(timeStart);
    setUpdTimeEnd(timeEnd);
    setUpdDateDifference(dateDifference);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleEscKey);
    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
    // eslint-disable-next-line
  }, []);

  const onUpdate = (e) => {
    e.preventDefault();

    const updatedTask = {
      isQueue: isQueue,
      isDevelopment: isDevelopment,
      isDone: isDone,
      title: updTitle,
      description: updDescription,
      timeOfWork: updDateDifference,
      dateStart: updTimeStart,
      dateEnd: updTimeEnd,
      priority: updPriority,
      attachedFiles: files,
      subTasks: [],
      comments: [],
      ProjectId: ProjectId,
    };

    dispatch(updateTasks(ProjectId, id, updatedTask));
    setPortalVisible(!portalVisible);
  };

  const renderPortal = () => {
    if (portalVisible) {
      return (
        <>
          {createPortal(
            <>
              <div className={`modal modal_task ${modalActive} `}>
                <form onSubmit={(e) => onUpdate(e)} className={`modal__form `}>
                  <div className="modal__header">
                    <h2 className="modal__title">Редактирование задачи</h2>
                    <div onClick={() => setPortalVisible(!portalVisible)} className="modal__close">
                      &times;
                    </div>
                  </div>

                  <div className="modal__wrapper modal__wrapper_task">
                    <div className="modal__item">
                      <label htmlFor="title">Название задачи:</label>
                      <input
                        required
                        value={updTitle}
                        onChange={(e) => setUpdTitle(e.target.value)}
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
                        value={updDescription}
                        onChange={(e) => setUpdDescription(e.target.value)}
                        type="textarea"
                        name="descr"
                        className="modal__input"
                        id="descr"
                        placeholder={description}
                      />
                    </div>

                    <DateInput endTime={task.dateEnd} onDatesChange={handleDateDataChange} />
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
                        checked={updPriority}
                        onClick={() => setUpdPriority(!updPriority)}
                        type="checkbox"
                        name="checkbox"
                        className="modal__input "
                        id="checkbox"
                      />
                    </div>
                    <div className="modal__buttons">
                      <button
                        onClick={() => setPortalVisible(!portalVisible)}
                        type="submit"
                        className="button button_modal_close"
                      >
                        Отменить
                      </button>
                      <button type="submit" className="button button_modal button_modal-edit">
                        Изменить
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div
                onClick={() => setPortalVisible(!portalVisible)}
                className={`modal__overlay ${overlayActive}`}
              ></div>
            </>,
            document.body
          )}
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <img onClick={() => setPortalVisible(!portalVisible)} src={Change} alt="Change" />
      {renderPortal()}
    </>
  );
};

export default TaskEdit;
