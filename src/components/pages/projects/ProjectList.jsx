import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { projectsFetching } from "../../../redux/actions/projectActions";
import ProjectItem from "./ProjectItem";

const ProjectList = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projects);
  const projectsLoadingStatus = useSelector((state) => state.projects.projectsLoadingStatus);

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
