import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { subtaskCreate } from "../../../../../redux/actions/subtasksActions";
import { createPortal } from "react-dom";
import { v4 as uid } from "uuid";

const SubtaskCreate = ({ task }) => {
  const dispatch = useDispatch();
  const [subtaskDescription, setSubtaskDescription] = useState("");
  const [subtaskPriority, setSubtaskPriority] = useState(false);
  const [subtaskPortalVisible, setSubtaskPortalVisible] = useState(false);

  const modalActive = subtaskPortalVisible ? "modal_active" : "";
  const overlayActive = subtaskPortalVisible ? "modal__overlay_active" : "";

  const handleEscKey = (event) => {
    if (event.key === "Escape" && subtaskPortalVisible) {
      setSubtaskPortalVisible(!subtaskPortalVisible);
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

    const newSubtask = {
      id: uid(),
      taskId: task.id,
      description: subtaskDescription,
      priority: subtaskPriority,
      isCompleted: false,
      subTasks: [],
      comments: [],
    };

    task.subTasks = [...task.subTasks, newSubtask];

    dispatch(subtaskCreate(task.ProjectId, task.id, task));
    setSubtaskPriority(false);
    setSubtaskDescription("");
    setSubtaskPortalVisible(!subtaskPortalVisible);
  };

  const renderPortal = () => {
    if (subtaskPortalVisible) {
      return (
        <>
          {createPortal(
            <>
              <div className={`modal modal__subtask ${modalActive}`}>
                <form onSubmit={(e) => onCreate(e)} className={`modal__form `}>
                  <div className="modal__header">
                    <h2 className="modal__title">Создание подзадачи</h2>
                    <div
                      onClick={() => setSubtaskPortalVisible(!subtaskPortalVisible)}
                      className="modal__close"
                    >
                      &times;
                    </div>
                  </div>
                  <div className="modal__wrapper modal__wrapper_project">
                    <div className="modal__item">
                      <label htmlFor="descr">Описание задачи:</label>
                      <textarea
                        required
                        value={subtaskDescription}
                        onChange={(e) => setSubtaskDescription(e.target.value)}
                        type="textarea"
                        name="descr"
                        className="modal__input"
                        id="descr"
                        placeholder="Введите описание задачи"
                      />
                    </div>
                  </div>

                  <div className="modal__footer modal__footer_task">
                    <div className="modal__item modal__item_checkbox">
                      <label htmlFor="checkbox">Высокий приоритет?</label>
                      <input
                        value={subtaskPriority}
                        onChange={() => setSubtaskPriority(!subtaskPriority)}
                        type="checkbox"
                        name="checkbox"
                        className="modal__input "
                        id="checkbox"
                      />
                    </div>
                    <div className="modal__buttons">
                      <button
                        onClick={() => setSubtaskPortalVisible(!subtaskPortalVisible)}
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
              <div
                onClick={() => setSubtaskPortalVisible(!subtaskPortalVisible)}
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
      <div
        onClick={() => setSubtaskPortalVisible(!subtaskPortalVisible)}
        className="subtask__create"
      >
        Добавить подзадачу
      </div>

      {renderPortal()}
    </>
  );
};

export default SubtaskCreate;
