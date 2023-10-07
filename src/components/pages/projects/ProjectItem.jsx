import ProjectDelete from "./actions/ProjectDelete";
import ProjectEdit from "./actions/ProjectEdit";
const ProjectItem = ({ name, id }) => {
  return (
    <li key={id} href="#" className="projects__item">
      <div className="projects__item-name">{name}</div>
      <div className="projects__item-buttons">
        <ProjectEdit id={id} />
        <ProjectDelete id={id} />
      </div>
    </li>
  );
};

export default ProjectItem;
