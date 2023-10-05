import DeleteEntity from "../../dbActions/DeleteEntity";

const ProjectItem = ({ name, id }) => {
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
