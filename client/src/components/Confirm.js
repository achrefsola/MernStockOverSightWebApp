import React, { useState } from 'react';
import '../styles/Confirm.css'

const ConfirmationDialog = ({ show, title, message, onConfirm, onCancel,restockmessage,radiobuttons=false }) => {
  const [radioValue, setRadioValue]= useState("yes");
  if (!show) return null;
  
  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };

  return (
    <div className="confirmation-dialog">
      <div className="confirmation-dialog-inner">
        <p className='message-title'>{title}</p>
        <p className='message-dialog'>{message}</p>

        {radiobuttons &&(
          <>
        <p className='message-dialog'>{restockmessage}</p>
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="yes" value="yes" defaultChecked={true} onChange={handleRadioChange}/>
            <label className="form-check-label" htmlFor="inlineRadio1">Yes</label>
        </div>
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="no" value="no" onChange={handleRadioChange}/>
            <label className="form-check-label" htmlFor="inlineRadio2">No</label>
        </div></>
      )}

        <div className="button-container-confirm">
          <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
          <button className="btn btn-success" onClick={() => onConfirm(radioValue)}>Confirm</button>

        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
