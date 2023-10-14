import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toogleModal } from "../../../../../redux/actions/modalActions";
import { taskCreated } from "../../../../../redux/actions/taskActions";
import { createPortal } from "react-dom";

const SubtaskCreate = ({ id }) => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(false);
  const [modalOn, setModalOn] = useState(false);

  const modalActive = modalOn ? "modal_active" : "";
  const overlayActive = modalOn ? "modal__overlay_active" : "";

  const handleEscKey = (event) => {
    if (event.key === "Escape" && modalOn) {
      setModalOn(modalOn);
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

      description: description,
      priority: priority,
      subTasks: [],
      comments: [],
      ProjectId: id.taskId,
    };

    dispatch(taskCreated(newTask, id.taskId));
    setModalOn(modalOn);
    setDescription("");
    setPriority(false);
  };

  return (
    <>
      <div onClick={() => dispatch(toogleModal())} className="subtask__create">
        Добавить подзадачу
      </div>
      {createPortal(
        <>
          <div className={`modal modal_task ${modalActive}`}>
            <form onSubmit={(e) => onCreate(e)} className={`modal__form `}>
              <div className="modal__header">
                <h2 className="modal__title">Создание задачи</h2>
                <div onClick={() => setModalOn(modalOn)} className="modal__close">
                  &times;
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
                    disabled={!modalOn}
                  />
                </div>
                <div className="modal__buttons">
                  <button
                    disabled={!modalOn}
                    onClick={() => setModalOn(modalOn)}
                    type="submit"
                    className="button button_modal_close"
                  >
                    Отменить
                  </button>
                  <button disabled={!modalOn} type="submit" className="button button_modal">
                    Создать
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div
            onClick={() => setModalOn(modalOn)}
            className={`modal__overlay ${overlayActive}`}
          ></div>
        </>,
        document.body
      )}
    </>
  );
};

export default SubtaskCreate;
