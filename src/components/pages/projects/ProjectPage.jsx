import Container from "../../container/Container";
import Header from "../../header/Header";
import ProjectList from "./projectList/ProjectList";

import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { projectCreated, projectsFetched,projectsFetchingError,projectsFetching } from "../../../actions/projectActions";

const ProjectPage = () => {
  const apiUrl = "https://651b2642194f77f2a5ae49fd.mockapi.io/api/Projects";
  const dispatch = useDispatch();
  const [toogleModalCreate, setToogleModalCreate] = useState(false);
  const [projectName, setProjectName] = useState("");

  const onCreate = (e) => {
    e.preventDefault();

    const newProject = {
      name: projectName
    }

    axios.post(apiUrl, newProject)
    .then((response) => dispatch(projectCreated(response.data)))
    .catch((e) => {
      console.error('Произошла ошибка при создании объекта:', e);
    });

    dispatch(projectsFetching());
    axios
      .get(apiUrl)
      .then((response) => dispatch(projectsFetched(response.data)))
      .catch(() => dispatch(projectsFetchingError()));


    // setDepartmentName("");
    // dispatch(toogleActionMenu());
  };

  return (
    <>
      <Container>
        <Header />
        <ProjectList />
        <div  className="modal modal__create">
      <form
          onSubmit={onCreate}
          className={`modal__form ${toogleModalCreate ? "modal__form_active" : ""}`}
        >
          <div className="modal__wrapper">
          <label htmlFor="name">
              Название проекта
            </label>
            <input
              required
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              type="text"
              name="name"
              className="modal__input"
              id="name"
              placeholder="Введите название проекта"
            />
          </div>
          <button type="submit" className="button">
            Создать
          </button>
        </form>,
      </div>
      </Container>

      
    </>
  );
};

export default ProjectPage;
