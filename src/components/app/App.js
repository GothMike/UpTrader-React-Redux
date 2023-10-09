import ProjectPage from "../pages/projects/ProjectPage";
import TaskPage from "../pages/tasks/TaskPage";
import Page404 from "../pages/page404/Page404";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "../../styles/index.scss";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ProjectPage />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/*" element={<Page404 />} />
          <Route path="/projects/*" element={<Page404 />} />
          <Route path="/projects/:taskId" element={<TaskPage />} />
        </Routes>
      </Router>
    </>
  );
};
export default App;
