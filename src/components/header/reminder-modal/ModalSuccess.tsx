import React from "react";
//@ts-ignore
import { default as success } from "../../../assets/images/success.png";
//@ts-ignore
import { Loader } from "monday-ui-react-core";
import "./_modal-success.scss";

interface IModalSuccessProps {
  finishedSending: boolean;
}

const ModalSuccess = ({ finishedSending }: IModalSuccessProps) => {
  return (
    <div className="modal-loading">
      {finishedSending && (
        <>
          <img src={success} alt="success" />
          <span>Reminder Sent!</span>
        </>
      )}
      {!finishedSending && <Loader size={40} />}
    </div>
  );
};

export default ModalSuccess;
