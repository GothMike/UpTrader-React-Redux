import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProject,
  fetchProjects,
  toogleModal,
} from "../../../../redux/actions/projectActions/index";

const ProjectModal = () => {
  const dispatch = useDispatch();
  const [projectName, setProjectName] = useState("");
  const modalCreateActive = useSelector((state) => state.projects.modalCreateActive);

  const handleEscKey = (event) => {
    if (event.key === "Escape") {
      dispatch(toogleModal(!modalCreateActive));
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

    createProject(newProject, dispatch);

    fetchProjects();

    setProjectName("");
  };

  return (
    <>
      <div className={`modal modal__create ${modalCreateActive ? "modal_active" : ""}`}>
        <form onSubmit={onCreate} className={`modal__form `}>
          <h2 className="modal__title">Создание проекта</h2>
          <div onClick={() => dispatch(toogleModal(modalCreateActive))} className="modal__close">
            &times;
          </div>
          <div className="modal__wrapper">
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
            />
          </div>
          <button type="submit" className="button">
            Создать
          </button>
        </form>
      </div>
    </>
  );
};

export default ProjectModal;
