import Container from "../../container/Container";
import Header from "../../header/Header";
import ProjectList from "./ProjectList";

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
