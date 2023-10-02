import Container from "../../container/Container";
import Header from "../../header/Header";
import ProjectList from "./projectList/ProjectList";

const ProjectPage = () => {
  return (
    <>
      <Container>
        <Header />
        <ProjectList />
      </Container>
    </>
  );
};

export default ProjectPage;
