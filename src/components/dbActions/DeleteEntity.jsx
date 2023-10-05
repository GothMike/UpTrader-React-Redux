import { projectDeleted } from "../../redux/actions/projectActions";

import { useDispatch } from "react-redux";

const DeleteEntity = ({ id }) => {
  const dispatch = useDispatch();

  const onDelete = (e) => {
    e.preventDefault();

    dispatch(projectDeleted(id));
  };

  return (
    <button onClick={onDelete} className="button button__delete">
      Удалить
    </button>
  );
};

export default DeleteEntity;
