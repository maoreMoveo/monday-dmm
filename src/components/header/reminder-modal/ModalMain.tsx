import React, { ChangeEvent } from 'react';
import './_modal-main.scss';
interface IPropsModalMain{
    handleChange:(e:ChangeEvent<HTMLInputElement>)=>void;
    selectSendTo:string
}
const ModalMain = ({handleChange,selectSendTo}:IPropsModalMain) => {
  return (
    <div className="modal-main">
          <div className="modal-title">Send Reminder</div>
          <div className="modal-instruction">
            <p>
              Send your team members a reminder to make sure they don’t forget
              to log in their hours.
            </p>
          </div>
          <div className="send-who">
            <span>To:</span>
            <div className="send-who-selection">
              <div className="incomplete-members">
                <input
                  type="radio"
                  id="incomplete"
                  name="send-who"
                  value="incomplete"
                  onChange={(event) => handleChange(event)}
                  checked={selectSendTo === "incomplete"}
                />
                <label htmlFor="incomplete">Members with missing entries</label>
              </div>
              <div className="all-members">
                <input
                  type="radio"
                  id="all"
                  name="send-who"
                  value="all"
                  onChange={(event) => handleChange(event)}
                  checked={selectSendTo === "all"}
                />
                <label htmlFor="all">Everyone</label>
              </div>
            </div>
          </div>
        </div>
  )
}

export default ModalMain