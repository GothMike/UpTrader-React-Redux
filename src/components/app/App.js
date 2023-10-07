import ProjectPage from "../pages/projects/ProjectPage";
import TaskPage from "../pages/tasks/TaskPage";
import Page404 from "../pages/Page404";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "../../styles/index.scss";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ProjectPage />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/projects/:id" element={<TaskPage />} />
          <Route path="*" element={<Page404 />}></Route>
        </Routes>
      </Router>
    </>
  );
};
export default App;
