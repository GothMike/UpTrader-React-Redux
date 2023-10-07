import ProjectDelete from "./actions/ProjectDelete";
import ProjectEdit from "./actions/ProjectEdit";
import { Link } from "react-router-dom";

const ProjectItem = ({ name, id }) => {
  return (
    <li>
      <Link key={id} className="projects__item" to={`/projects/${id}`}>
        <div className="projects__item-name">{name}</div>
        <div className="projects__item-buttons">
          <ProjectEdit id={id} />
          <ProjectDelete id={id} />
        </div>
      </Link>
    </li>
  );
};

export default ProjectItem;
