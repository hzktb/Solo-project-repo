import React from "react";
import { Link, navigate } from "@reach/router";
import * as GaIcons from "react-icons/gi";
import axios from "axios";
function NavBar(props) {
  // const [dropDown, setDropDown] = useState(false);
  // const [selected, setSelected] = useState("home");

  const { dropDown, setDropDown, selected, setSelected } = props;

  const handleMenuBar = () => {
    if (dropDown === true) {
      setDropDown(false);
    } else {
      setDropDown(true);
    }
  };

  const handleLogout = () => {
    axios
      .post("http://localhost:8000/api/logout", {}, { withCredentials: true })
      .then((res) => navigate("/"))
      .catch((err) => console.log(err.response));
  };

  return (
    <>
      <header className="d-flex align-items-center pb-3 mb-2 border-bottom">
        <span className="menu-bars" onClick={handleMenuBar}>
          <GaIcons.GiHamburgerMenu />
        </span>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </header>
      <nav>
        <ul
          className={
            "dropdown-menu" +
            (dropDown ? "-active dropdown-fadeIn" : "") +
            " dropdown-menu-macos mx-0 shadow"
          }
          style={{ width: "220px" }}
        >
          <li
            key="login"
            onClick={() => {
              setSelected("login");
              setDropDown(false);
            }}
          >
            <Link
              to="/"
              className={
                "dropdown-item " + (selected === "login" ? "active" : "")
              }
            >
              Login
            </Link>
          </li>
          <li
            key="PO"
            onClick={() => {
              setSelected("PO");
              setDropDown(false);
            }}
          >
            <Link
              to="/invoices/addNew"
              className={"dropdown-item " + (selected === "PO" ? "active" : "")}
            >
              Make Purchase Order
            </Link>
          </li>
          <li
            key="home"
            onClick={() => {
              setSelected("home");
              setDropDown(false);
            }}
          >
            <Link
              to="/main"
              className={
                "dropdown-item " + (selected === "home" ? "active" : "")
              }
            >
              Home
            </Link>
          </li>
          <li
            key="name"
            onClick={() => {
              setSelected("year");
              setDropDown(false);
            }}
          >
            <Link
              to="/invoices/name"
              className={
                "dropdown-item " + (selected === "searchByName" ? "active" : "")
              }
            >
              Search by Name
            </Link>
          </li>
          <li
            key="year"
            onClick={() => {
              setSelected("year");
              setDropDown(false);
            }}
          >
            <Link
              to="/invoices/year"
              className={
                "dropdown-item " + (selected === "year" ? "active" : "")
              }
            >
              Search by year
            </Link>
          </li>
          <li
            key="month"
            onClick={() => {
              setSelected("month");
              setDropDown(false);
            }}
          >
            <Link
              to="/invoices/month"
              className={
                "dropdown-item " + (selected === "month" ? "active" : "")
              }
            >
              Search by month
            </Link>
          </li>
          <li
            key="day"
            onClick={() => {
              setSelected("day");
              setDropDown(false);
            }}
          >
            <Link
              to="/invoices/day"
              className={
                "dropdown-item " + (selected === "day" ? "active" : "")
              }
            >
              Search by day
            </Link>
          </li>
        </ul>
        <div
          className={
            "btn btn-primary " + (selected === "login" ? "tagActive" : "tag")
          }
          style={{ top: "260px" }}
        >
          Login
        </div>
        <div
          className={
            "btn btn-primary " + (selected === "home" ? "tagActive" : "tag")
          }
          style={{ top: "260px" }}
        >
          Home
        </div>
        <div
          className={
            "btn btn-primary " + (selected === "PO" ? "tagActive" : "tag")
          }
          style={{ top: "260px" }}
        >
          Create Purchase Order
        </div>
        <div
          className={
            "btn btn-primary " +
            (selected === "searchByName" ? "tagActive" : "tag")
          }
          style={{ top: "260px" }}
        >
          Search by Customer Name
        </div>
        <div
          className={
            "btn btn-primary " + (selected === "year" ? "tagActive" : "tag")
          }
          style={{ top: "260px" }}
        >
          Search by Year
        </div>
        <div
          className={
            "btn btn-primary " + (selected === "month" ? "tagActive" : "tag")
          }
          style={{ top: "260px" }}
        >
          Search by Month
        </div>
        <div
          className={
            "btn btn-primary " + (selected === "day" ? "tagActive" : "tag")
          }
          style={{ top: "260px" }}
        >
          Search by Date
        </div>
        <div
          className={
            "btn btn-primary " + (selected === "details" ? "tagActive" : "tag")
          }
          style={{ top: "260px" }}
        >
          Order Details
        </div>
        <div
          className={
            "btn btn-primary " + (selected === "update" ? "tagActive" : "tag")
          }
          style={{ top: "260px" }}
        >
          Product Update
        </div>
      </nav>
    </>
  );
}

export default NavBar;
