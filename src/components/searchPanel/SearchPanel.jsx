import { useDispatch } from "react-redux";
import { searchEnteredData } from "../../redux/actions/projectActions";
import { useEffect, useState } from "react";

const SearchPanel = () => {
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      dispatch(searchEnteredData(searchQuery));
    }, 500);

    return () => {
      clearTimeout(delaySearch);
    };
  }, [searchQuery, dispatch]);

  const onChange = (e) => {
    setSearchQuery(e.target.value);
  };
  return (
    <>
      <form className="header__search">
        <input
          className="header__input"
          placeholder="Поиск"
          aria-label="Поиск"
          name="search"
          type="text"
          onChange={onChange}
          value={searchQuery}
        />
      </form>
    </>
  );
};

export default SearchPanel;
