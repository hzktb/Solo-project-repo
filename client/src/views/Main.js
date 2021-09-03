import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "@reach/router";

const Main = (props) => {
  const { setSelected } = props;
  const [invoices, setInovices] = useState([]);
  useEffect(() => {
    setSelected("home");
    axios
      .get("http://localhost:8000/api/all", { withCredentials: true })
      .then((res) => {
        setInovices(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <h1 className="p-4">All Invoices</h1>
      <ul>
        {invoices
          .sort((a, b) => {
            if (a.date < b.date) {
              return 1;
            }
          })
          .map((invoice, index) => (
            <li key={index}>
              <Link to={"/invoices/details/" + invoice._id}>
                {invoice.customerName}
              </Link>
              ,{invoice.date.slice(0, 10)}
            </li>
          ))}
      </ul>
    </>
  );
};

export default Main;
