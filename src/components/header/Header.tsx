import React, { useState } from "react";
//@ts-ignore
import { Button } from "monday-ui-react-core";
import "./_header.scss";
import ReminderModal from "./reminder-modal/ReminderModal";

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <header>
        <div className="header-demarcation">
          <div className="title">
            <h1>Hourly</h1>
          </div>
          <div className="controls">
            <Button className="set-reminder" onClick={handleToggleModal}>
              Send Reminder
            </Button>
          </div>
        </div>
        {isOpen && <ReminderModal handleToggleModal={handleToggleModal} />}
      </header>
    </>
  );
};

export default Header;
