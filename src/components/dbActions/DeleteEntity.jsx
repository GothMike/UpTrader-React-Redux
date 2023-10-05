import { deleteProject } from "../../redux/actions/projectActions";
import { useDispatch } from "react-redux";

import {
  projectsFetched,
  projectsFetching,
  projectsFetchingError,
  fetchProjects,
} from "../../redux/actions/projectActions";

const DeleteEntity = ({ id }) => {
  const dispatch = useDispatch();

  console.log(id);

  const onDelete = (e) => {
    e.preventDefault();

    deleteProject(id, dispatch);

    dispatch(fetchProjects());
  };

  return (
    <button onClick={onDelete} className="button button__delete">
      Удалить
    </button>
  );
};

export default DeleteEntity;
