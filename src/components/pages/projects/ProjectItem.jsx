import {
  deleteProject,
  fetchProjects,
  projectsFetched,
  projectsFetching,
  projectsFetchingError,
  apiUrl,
} from "../../../redux/actions/projectActions";
import { useDispatch } from "react-redux";
import axios from "axios";

const ProjectItem = ({ name, id }) => {
  const dispatch = useDispatch();

  const onDelete = (e) => {
    e.preventDefault();

    deleteProject(id, dispatch);
  };

  return (
    <li key={id} href="#" className="projects__item">
      <div className="projects__item-name">{name}</div>
      <div className="projects__item-buttons">
        <button className="button button__edit">Редактировать</button>
        <button onClick={onDelete} className="button button__delete">
          Удалить
        </button>
      </div>
    </li>
  );
};

export default ProjectItem;
