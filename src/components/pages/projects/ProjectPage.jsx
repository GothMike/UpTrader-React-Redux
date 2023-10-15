import Container from "../../container/Container";
import Header from "../../header/Header";
import ProjectList from "./ProjectList";
import { Helmet } from "react-helmet";

const ProjectPage = () => {
  return (
    <>
      <Helmet>
        <title>Проекты</title>
        <meta name="description" content="Страница с проектами" />
      </Helmet>
      <Container>
        <Header />
        <ProjectList />
      </Container>
    </>
  );
};

export default ProjectPage;
