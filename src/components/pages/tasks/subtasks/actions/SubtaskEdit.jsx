import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { subtaskUpdate } from "../../../../../redux/actions/subtasksActions";
import { createPortal } from "react-dom";
import Change from "../../../../../assets/Change.svg";

const SubtaskEdit = ({ task, subtask }) => {
  const { subTasks } = task;
  const { id } = subtask;
  const dispatch = useDispatch();

  const [subtaskDescription, setSubtaskDescription] = useState("");
  const [subtaskPriority, setSubtaskPriority] = useState(false);
  const [portalVisible, setPortalVisible] = useState(false);

  const modalActive = portalVisible ? "modal_active" : "";
  const overlayActive = portalVisible ? "modal__overlay_active" : "";

  const handleEscKey = (event) => {
    if (event.key === "Escape" && portalVisible) {
      setPortalVisible(!portalVisible);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleEscKey);
    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
    // eslint-disable-next-line
  }, []);

  const onEdit = (e) => {
    e.preventDefault();

    const updateSubtask = {
      id: id,
      taskId: task.id,
      description: subtaskDescription,
      priority: subtaskPriority,
      subTasks: [],
      comments: [],
    };

    task.subTasks = subTasks.map((subtask) => {
      if (subtask.id === updateSubtask.id) {
        return {
          ...subtask,
          ...updateSubtask,
        };
      }
      return subtask;
    });

    dispatch(subtaskUpdate(task.ProjectId, task.id, task));
    setSubtaskPriority(false);
    setSubtaskDescription("");
    setPortalVisible(!portalVisible);
  };

  const renderPortal = () => {
    if (portalVisible) {
      return (
        <>
          {createPortal(
            <>
              <div className={`modal modal__subtask ${modalActive}`}>
                <form onSubmit={(e) => onEdit(e)} className={`modal__form `}>
                  <div className="modal__header">
                    <h2 className="modal__title">Редактирование подзадачи</h2>
                    <div onClick={() => setPortalVisible(!portalVisible)} className="modal__close">
                      &times;
                    </div>
                  </div>
                  <div className="modal__wrapper  modal__wrapper_project">
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
                        onClick={() => setPortalVisible(!portalVisible)}
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

export default SubtaskEdit;
