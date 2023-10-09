import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toogleModal, projectCreated } from "../../../../redux/actions/projectActions";
import { createPortal } from "react-dom";

const TaskCreate = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const modalCreateActive = useSelector((state) => state.projects.modalCreateActive);
  const modalCreateSuccess = useSelector((state) => state.projects.modalCreateSuccess);

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
      //   isDevelopment: false,
      //   isDone: false,
      //   taskNumber: 18,
      title: { title },
      description: { description },
      timeOfWork: 4,
      dateStart: 1696873782,
      dateEnd: "dateEnd 1",
      priority: true,
      attachedFiles: "attachedFiles 1",
      subTasks: [],
      comments: "comments 1",
      ProjectId: "1",
    };

    // dispatch(projectCreated(newTask));
    dispatch(toogleModal(modalCreateActive));
    // setProjectName("");
  };

  return (
    <>
      <button onClick={() => dispatch(toogleModal())} className="button">
        Создать
      </button>
      {createPortal(
        <>
          <div className={`modal ${modalActive}`}>
            <form onSubmit={(e) => onCreate(e)} className={`modal__form `}>
              <h2 className="modal__title">Создание задачи</h2>
              <div
                onClick={() => dispatch(toogleModal(modalCreateActive))}
                className="modal__close"
              >
                &times;
              </div>
              <div className="modal__wrapper">
                <label htmlFor="name">Название задачи</label>
                <input
                  required
                  //   value={projectName}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  name="name"
                  className="modal__input"
                  id="name"
                  placeholder="Введите название"
                  disabled={!modalCreateActive}
                />
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
