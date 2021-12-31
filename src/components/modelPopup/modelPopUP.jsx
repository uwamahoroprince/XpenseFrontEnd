import React, { useState } from "react";
import Modal from "react-modal";
import { postAccount } from "../../dataRequests/account";
import "./modelPopUp.css";
Modal.setAppElement("#root");
const ModelPopUp = (props) => {
  const [name, setName] = useState("");
  const [currency, setCurrency] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const account = {
      name: name,
      currency: currency,
    };
    postAccount(account);
  };

  const customStyles = {
    content: {
      top: "20%",
      left: "25%",
      right: "40%",
      background: "#fff",
      opacity: 1,
      overflow: "auto",
      WebkitOverflowScrolling: "touch",
      borderRadius: "4px",
      outline: "none",
    },
    overlay: {
      backgroundColor: "rgba(238, 228, 248, 0.80)",
      // opacity: 0.8,
    },
  };
  return (
    <>
      <Modal
        isOpen={props.onShow}
        onRequestClose={props.onClose}
        style={customStyles}
      >
        <div className="modalContainer">
          <span className="acTitle">New Account</span>
          <h5 className="acDesc">
            Create an income/expense account to start recording you can create
            up to 5 accounts
          </h5>
          <form onSubmit={handleSubmit}>
            <div className="inputACT">
              <span className="actName">Name</span>
              <input
                required={true}
                className="actNameInput"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Account Name"
              />
              <span className="actName">Currency</span>
              <input
                className="actNameInput"
                type="text"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                placeholder="Choose Currency"
              />
              <button className="actButton">ADD Account</button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};
export default ModelPopUp;
