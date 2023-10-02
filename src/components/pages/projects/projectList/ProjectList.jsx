import ProjectItem from "../projectItem/ProjectItem";

const ProjectList = () => {
  return (
    <>
      <section className="projects">
        <h2 className="projects__title">Проекты</h2>
        <div className="projects__list">
          <ProjectItem />
          <ProjectItem />
          <ProjectItem />
          <ProjectItem />
          <ProjectItem />
          <ProjectItem />
        </div>
      </section>
    </>
  );
};

export default ProjectList;
