import React from "react";
//@ts-ignore
import { Button } from "monday-ui-react-core";
import "./_modal-controls.scss";

interface IModalControls {
  handleToggleModal: () => void;
  handleSubmit: () => void;
}

const ModalControls = ({ handleToggleModal, handleSubmit }: IModalControls) => {
  return (
    <div className="modal-controls">
      <div className="buttons">
        <Button
          color="primary-background-color"
          style={{ color: "#000" }}
          className="cancel"
          onClick={handleToggleModal}
        >
          Cancel
        </Button>
        <Button className="send" onClick={handleSubmit}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default ModalControls;
