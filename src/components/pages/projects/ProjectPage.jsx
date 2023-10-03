import Container from "../../container/Container";
import Header from "../../header/Header";
import ProjectList from "./ProjectList";
import ProjectModal from "./modals/ProjectModal";

const ProjectPage = () => {
  return (
    <>
      <Container>
        <Header />
        <ProjectList />
        <ProjectModal />
      </Container>
    </>
  );
};

export default ProjectPage;
