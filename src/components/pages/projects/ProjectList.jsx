import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { projectsFetching } from "../../../redux/actions/projectActions";
import ProjectItem from "./ProjectItem";
import Spinner from "../../spinner/Spinner";

const ProjectList = () => {
  const searchQuery = useSelector((state) => state.projects.dataEntry);
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projects);
  const projectLoadingStatus = useSelector((state) => state.projects.projectLoadingStatus);

  useEffect(() => {
    dispatch(projectsFetching());
  }, []);

  const renderData = (arr, searchQuery) => {
    const filteredData = arr.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredData.length === 0) {
      return <div>Нет результатов по вашему запросу</div>;
    }

    return filteredData.map(({ ...props }) => {
      return <ProjectItem key={props.id} {...props} />;
    });
  };

  const elements = renderData(projects, searchQuery);

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
