const ProjectItem = () => {
  return (
    <>
      <div href="#" className="projects__item">
        <div className="projects__item-name">Test Item</div>
        <div className="projects__item-buttons">
          <button className="button button__edit">Редактировать</button>
          <button className="button button__delete">Удалить</button>
        </div>
      </div>
    </>
  );
};

export default ProjectItem;
