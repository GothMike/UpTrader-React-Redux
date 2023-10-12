import ProjectDelete from "./actions/ProjectDelete";
import ProjectEdit from "./actions/ProjectEdit";
import { Link } from "react-router-dom";

const ProjectItem = ({ name, id }) => {
  return (
    <li key={id}>
      <div className="projects__item">
        <Link to={`/projects/${id}`} className="projects__item-name">
          {name}
        </Link>
        <div className="projects__item-buttons">
          <ProjectEdit id={id} />
          <ProjectDelete id={id} />
        </div>
      </div>
    </li>
  );
};

export default ProjectItem;
