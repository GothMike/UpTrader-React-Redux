import { deleteProject } from "../../../redux/actions/projectActions";
import { useDispatch } from "react-redux";

import DeleteEntity from "../../dbActions/DeleteEntity";

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
        <DeleteEntity id={id} />
      </div>
    </li>
  );
};

export default ProjectItem;
