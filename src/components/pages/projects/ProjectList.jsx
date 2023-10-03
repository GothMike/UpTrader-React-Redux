import { useEffect } from "react";
import { useDispatch, useSelector, UseSelector } from "react-redux";
import {
  projectsFetched,
  projectsFetching,
  projectsFetchingError,
} from "../../../redux/actions/projectActions";
import axios from "axios";
import ProjectItem from "./ProjectItem";

const ProjectList = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projects);
  const projectsLoadingStatus = useSelector((state) => state.projects.projectsLoadingStatus);
  const apiUrl = "https://651b2642194f77f2a5ae49fd.mockapi.io/api/Projects";

  useEffect(() => {
    dispatch(projectsFetching());
    axios
      .get(apiUrl)
      .then((response) => dispatch(projectsFetched(response.data)))
      .catch(() => dispatch(projectsFetchingError()));
  }, []);

  const renderData = (arr) => {
    if (arr.length === 0) {
      return <div>На текущий момент нет доступных проектов</div>;
    }

    return arr.map(({ ...props }) => {
      return <ProjectItem key={props.id} {...props} />;
    });
  };

  const elements = renderData(projects);
  return (
    <>
      <section className="projects">
        <h2 className="projects__title">Проекты</h2>
        <ul className="projects__list">{elements}</ul>
      </section>
    </>
  );
};

export default ProjectList;
