import React, { useContext, useEffect, useState } from "react";
import { trasactionStatusContext } from "../../helper/context";
import ModelPopUp from "../modelPopup/modelPopUP";
import axios from "axios";
import { url } from "../../constants/constants";
import { Link } from "react-router-dom";

import "./sideBar.css";
const SideBar = () => {
  const { statusValue, setStatusValue } = useContext(trasactionStatusContext);
  const { idValue, setIdValue } = useContext(trasactionStatusContext);
  const [accounts, setAccounts] = useState([]);

  const [status, setStatus] = useState(false);

  const getAccounts = async () => {
    try {
      const response = await axios.get(`${url.getAccounts}`);
      setAccounts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAccounts();
  }, []);

  return (
    <>
      <ModelPopUp onShow={status} onClose={() => setStatus(false)} />
      <div className="SideBarcontainer">
        <div className="sideTitle">
          <h3 className="MYaccounts">MY Accounts</h3>
          <i
            className="fas fa-plus-circle"
            style={{ color: "#ecaa11" }}
            onClick={() => setStatus(true)}
          ></i>
        </div>
        <div className="upper">
          <div className="spanDiv">
            <span
              onClick={function handleFlaseCategoryClick() {
                setStatusValue(false);
                setIdValue(0);
              }}
              className="TitleSpan"
            >
              All Accounts
            </span>
          </div>
          {accounts.map((data) => (
            <div key={data.id} className="accounts">
              <span
                onClick={function handleCategoryClick() {
                  setStatusValue(true);
                  setIdValue(data.id);
                }}
                key={data.name}
                className="accountName"
              >
                {data.name}
              </span>
            </div>
          ))}
        </div>
        <div className="line"></div>
        <div className="middle">
          <div className="settings">
            <Link to="preferences">
              <i className="fas fa-cog" style={{ color: "#434644" }}></i>
              <span className="mySettings">Preferences</span>
            </Link>
          </div>
          <div className="settings">
            <Link to="profile">
              <i className="fas fa-user" style={{ color: "#434644" }}></i>
              <span className="mySettings">My Profile</span>
            </Link>
          </div>
        </div>
        <div className="buttom">
          <span className="logoutSpan">logout</span>
          <i className="fas fa-sign-out-alt"></i>
        </div>
      </div>
    </>
  );
};
export default SideBar;
