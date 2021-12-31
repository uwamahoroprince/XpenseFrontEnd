import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../constants/constants";
import "./preferencses.css";
import Modal from "react-modal/lib/components/Modal";
import { Link } from "react-router-dom";

const Preference = () => {
  const [general, setGeneral] = useState(true);
  const [back, setBack] = useState(true);
  const [catAddStatus, setCatAddStatud] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [isChanged, setIsChanged] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [name, setName] = useState("");
  const [tType, setTTpe] = useState("");
  const deleteCategory = async (catId) => {
    try {
      const response = await axios.delete(`${url.getCategories}/${catId}`);
    } catch (error) {
      console.log(error);
    }
    setIsChanged(false);
  };
  const handlePostCategory = async (e) => {
    e.preventDefault();
    const category = {
      name: name,
      transactionType: tType,
    };
    try {
      const response = await axios.post(`${url.getCategories}`, category);
    } catch (error) {
      console.log(error);
    }
    setCatAddStatud(false);
    setIsChanged(true);
  };
  const AddCategory = () => {
    const customCatStyles = {
      content: {
        top: "30%",
        left: "30%",
        right: "35%",
        background: "#fff",
        opacity: 1,
        overflow: "auto",
        WebkitOverflowScrolling: "touch",
        borderRadius: "4px",
        outline: "none",
      },
      overlay: {
        backgroundColor: "rgba(238, 228, 248, 0.80)",
      },
    };
    return (
      <>
        <Modal
          isOpen={catAddStatus}
          onRequestClose={() => setCatAddStatud(false)}
          style={customCatStyles}
        >
          <span className="ptitle" style={{ marginTop: "20px" }}>
            New Category
          </span>
          <form onSubmit={handlePostCategory}>
            <div className="inputG">
              <span className="actName">Category Name</span>
              <input
                required={true}
                className="actNameInput"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="set Monthly limit"
              />
              <span className="actName">Type</span>
              <input
                className="actNameInput"
                value={tType}
                onChange={(e) => setTTpe(e.target.value)}
                type="text"
                placeholder="Choose Currency"
              />

              <button className="gButton">ADD Category</button>
            </div>
          </form>
        </Modal>
      </>
    );
  };

  const getAllCAtegories = async () => {
    const response = await axios.get(`${url.getCategories}`);
    const data = response.data;
    setAllCategories(data);
  };
  const customStyles = {
    content: {
      top: "13%",
      left: "25%",
      right: "25%",
      background: "#fff",
      opacity: 1,
      overflow: "auto",
      WebkitOverflowScrolling: "touch",
      borderRadius: "4px",
      outline: "none",
    },
    overlay: {
      //   backgroundColor: "rgba(238, 228, 248, 0.80)",
      //   opacity: 1,
    },
  };
  useEffect(() => {
    getAllCAtegories();
  }, [isDeleted, isChanged]);
  return (
    <>
      <Modal isOpen={back} style={customStyles}>
        <div className="nav">
          <Link to="/">
            <i
              onClick={() => setBack(false)}
              class="fas fa-long-arrow-alt-left"
              style={{ marginLeft: "15px", fontSize: "20px" }}
            ></i>
          </Link>
        </div>
        <div className="menu">
          <span onClick={() => setGeneral(true)} className="generalMenu">
            General
          </span>
          <span onClick={() => setGeneral(false)} className="catMenu">
            Category
          </span>
        </div>

        <div className="contentContainer">
          {general ? (
            <div className="preferenceContainer">
              <span className="ptitle">Preferense</span>
              <form>
                <div className="inputG">
                  <span className="actName">Name</span>
                  <input
                    required={true}
                    className="actNameInput"
                    type="text"
                    placeholder="set Monthly limit"
                  />
                  <span className="actName">Currency</span>
                  <input
                    className="actNameInput"
                    type="text"
                    placeholder="Choose Currency"
                  />
                  <div className="org">
                    <input
                      type="checkbox"
                      name="field name"
                      value="Initial value"
                    />
                  </div>
                  <span>Keep me logged in</span>
                  <button className="gButton">ADD Account</button>
                </div>
              </form>
            </div>
          ) : (
            <div className="categoryContainer">
              <div className="catHeader">
                <span className="catCount">
                  {allCategories.length} Categories
                </span>
                <button
                  className="catAddButton"
                  onClick={() => setCatAddStatud(true)}
                >
                  Add Category
                </button>
              </div>
              <div className="catTable">
                {allCategories.map((data, index) => (
                  <div className="table-row">
                    <div className="table-data1">{index + 1}</div>
                    <div className="table-data1">{data.name}</div>
                    <div className="table-data1" style={{ color: "#7B728D" }}>
                      {data.transactionType.toLowerCase()} Category
                    </div>

                    <div className="editIcon">
                      <i
                        className="fas fa-pen"
                        style={{ color: "#5e419a" }}
                      ></i>
                    </div>
                    <div className="deleteicon">
                      <i
                        onClick={() => deleteCategory(data.id)}
                        class="fas fa-times"
                        style={{ color: "purple" }}
                      ></i>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Modal>
      <AddCategory />
    </>
  );
};
export default Preference;
