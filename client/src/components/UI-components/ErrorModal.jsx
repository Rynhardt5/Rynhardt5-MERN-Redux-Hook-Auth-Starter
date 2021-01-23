import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../../redux/actions/errorActions";

import "./ErrorModal.scss";

const ErrorModal = () => {
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();

  if (!error) {
    return <div className="display-none"></div>;
  }

  const closeModal = () => {
    dispatch(clearError());
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="error-modal">
        {/* <h4 className="default-modal__header">Error</h4> */}
        <p className="error-modal__text">{error.message}</p>
        <div className="error-modal__button-container">
          <button onClick={closeModal} className="error-modal__button">
            Okay
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
