import ProjectCreate from "../pages/projects/actions/ProjectCreate";
import SearchPanel from "../searchPanel/SearchPanel";

const Header = () => {
  return (
    <>
      <header className="header">
        <h1 className="header__title">
          Добро пожаловать веб-приложение <br />
          <span>UpTrader</span>
        </h1>
        <div className="header__wrapper">
          <SearchPanel />
          <ProjectCreate />
        </div>
      </header>
    </>
  );
};

export default Header;
