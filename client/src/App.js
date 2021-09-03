import React, { useState } from "react";
import { Router } from "@reach/router";
import "./App.css";
import "./views/Main";
import Main from "./views/Main";
import NavBar from "./components/NavBar";
import Year from "./views/Year";
import Month from "./views/Month";
import Day from "./views/Day";
import SearchByName from "./views/SearchByName";
import Details from "./views/Details";
import PurchaseOrder from "./views/PurchaseOrder";
import Update from "./views/Update";
import LoginPage from "./views/LoginPage";

function App() {
  const [dropDown, setDropDown] = useState(false);
  const [selected, setSelected] = useState("login");

  return (
    <div className="App">
      <div className="col-lg-8 mx-auto p-3 py-md-8">
        <NavBar
          dropDown={dropDown}
          setDropDown={setDropDown}
          selected={selected}
          setSelected={setSelected}
        />
        <Router>
          <LoginPage path="/" setSelected={setSelected} />
          <Main path="/main" setSelected={setSelected} />
          <SearchByName path="/invoices/name" setSelected={setSelected} />
          <Year path="/invoices/year" setSelected={setSelected} />
          <Month path="/invoices/month" setSelected={setSelected} />
          <Day path="/invoices/day" setSelected={setSelected} />
          <Details path="/invoices/details/:id" setSelected={setSelected} />
          <PurchaseOrder path="/invoices/addNew" setSelected={setSelected} />
          <Update path="/invoices/update/:id" setSelected={setSelected} />
        </Router>
      </div>
    </div>
  );
}

export default App;
