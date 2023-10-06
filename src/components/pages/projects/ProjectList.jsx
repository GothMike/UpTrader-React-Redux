import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { projectsFetching } from "../../../redux/actions/projectActions";
import ProjectItem from "./ProjectItem";
import Spinner from "../../spinner/Spinner";

const ProjectList = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projects);
  const projectLoadingStatus = useSelector((state) => state.projects.projectLoadingStatus);

  console.log(projectLoadingStatus);
  useEffect(() => {
    // Вызываем функцию загрузки данных при монтировании компонента
    dispatch(projectsFetching());
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

  switch (projectLoadingStatus) {
    case "loading":
      return (
        <>
          <section className="projects">
            <h2 className="projects__title">Проекты</h2>
            <h3 className="projects__list">
              <Spinner />
            </h3>
          </section>
        </>
      );
    case "idle":
      return (
        <>
          <section className="projects">
            <h2 className="projects__title">Проекты</h2>
            <ul className="projects__list">{elements}</ul>
          </section>
        </>
      );
    case "error":
      return (
        <>
          <h2 className="projects__title">Проекты</h2>
          <h3 className="projects__list">Произошла ошибка</h3>
        </>
      );
    default:
      return <h2 className="projects__title">Глобальная непредвиденная ошибка</h2>;
  }
};

export default ProjectList;
