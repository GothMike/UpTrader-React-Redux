import ProjectCreate from "../pages/projects/actions/ProjectCreate";
import TaskCreate from "../pages/tasks/actions/TaskCreate";
import SearchPanel from "../searchPanel/SearchPanel";
import { useParams } from "react-router-dom";

const Header = () => {
  const id = useParams();
  const isEmpty = (obj) => Object.keys(obj).length === 0;

  const Create = isEmpty(id) ? <ProjectCreate /> : <TaskCreate />;

  return (
    <>
      <header className="header">
        <h1 className="header__title">
          Добро пожаловать веб-приложение <br />
          <span>UpTrader</span>
        </h1>
        <div className="header__wrapper">
          <SearchPanel />
          {Create}
        </div>
      </header>
    </>
  );
};

export default Header;
