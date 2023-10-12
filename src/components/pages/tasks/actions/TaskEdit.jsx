import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { projectUpdated } from "../../../../redux/actions/projectActions";
import { createPortal } from "react-dom";

const ProjectEdit = ({ id }) => {
  const dispatch = useDispatch();
  const [projectName, setProjectName] = useState("");
  const modalUpdateSuccess = useSelector((state) => state.projects.modalUpdateSuccess);
  const [portalVisible, setPortalVisible] = useState(false);

  const successModal = modalUpdateSuccess ? (
    <div className="modal__success">Успешно отредактировано!</div>
  ) : null;

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

  const onUpdate = (e) => {
    e.preventDefault();

    const editedProject = {
      id: id,
      name: projectName,
    };

    dispatch(projectUpdated(editedProject));
    setProjectName("");
    setPortalVisible(!portalVisible);
  };

  const renderPortal = () => {
    if (portalVisible) {
      return (
        <>
          {createPortal(
            <>
              <div className={`modal ${modalActive}`}>
                <form onSubmit={(e) => onUpdate(e, id)} className={`modal__form `}>
                  <div className="modal__header">
                    <h2 className="modal__title">Редактирование</h2>
                    <div onClick={() => setPortalVisible(!portalVisible)} className="modal__close">
                      &times;
                    </div>
                  </div>
                  <div className="modal__wrapper">
                    <div className="modal__item">
                      <label htmlFor="name">Изменить проекта</label>
                      <input
                        required
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        type="text"
                        name="name"
                        className="modal__input"
                        id="name"
                        placeholder="Введите новое название"
                        disabled={!portalVisible}
                      />
                    </div>
                  </div>
                  <div className="modal__footer">
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
                disabled={portalVisible}
                className={`modal__overlay ${overlayActive} `}
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
      <button onClick={() => setPortalVisible(!portalVisible)} className="button button__edit">
        Редактировать
      </button>
      {successModal}
      {renderPortal()}
    </>
  );
};

export default ProjectEdit;
