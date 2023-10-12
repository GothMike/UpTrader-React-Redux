import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { projectCreated } from "../../../../redux/actions/projectActions";
import { toogleModal } from "../../../../redux/actions/modalActions";
import { createPortal } from "react-dom";

const ProjectCreate = () => {
  const dispatch = useDispatch();
  const [projectName, setProjectName] = useState("");
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
    const newProject = {
      name: projectName,
    };
    dispatch(projectCreated(newProject));
    dispatch(toogleModal(modalCreateActive));
    setProjectName("");
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
              <div className="modal__header">
                <h2 className="modal__title">Создание проекта</h2>
                <div
                  onClick={() => dispatch(toogleModal(modalCreateActive))}
                  className="modal__close"
                >
                  &times;
                </div>
              </div>

              <div className="modal__wrapper">
                <div className="modal__item">
                  <label htmlFor="name">Название проекта</label>
                  <input
                    required
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    type="text"
                    name="name"
                    className="modal__input"
                    id="name"
                    placeholder="Введите название"
                    disabled={!modalCreateActive}
                  />
                </div>
              </div>
              <div className="modal__footer">
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

      {SuccessModal}
    </>
  );
};

export default ProjectCreate;
