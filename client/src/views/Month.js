import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "@reach/router";

function Month(props) {
  const { setSelected } = props;
  const [invoices, setInovices] = useState([]);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setSelected("month");
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:8000/api/viewByMonth/" + year + "/" + month, {
        withCredentials: true,
      })
      .then((res) => {
        setInovices(res.data);
        setLoaded(true);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h1 className="p-4">Search Invoices by Month/Year</h1>
      <form onSubmit={handleSubmit} className="p-4">
        <p>
          <label htmlFor="year">Year: </label>
          <input
            type="text"
            name="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="form-control"
            style={{ width: "20vw" }}
          />
        </p>
        <p>
          <label htmlFor="month">Month: </label>
          <input
            type="text"
            name="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="form-control"
            style={{ width: "20vw" }}
          />
        </p>
        <input type="submit" value="search" className="btn btn-primary" />
      </form>
      {loaded && (
        <ul className="m-3 p-3">
          {invoices
            .sort((a, b) => {
              if (a.date < b.date) {
                return -1;
              }
            })
            .map((invoice, index) => (
              <li key={index}>
                <Link to={`/invoices/details/${invoice._id}`}>
                  {invoice.customerName}
                </Link>
                , {invoice.date.slice(0, 10)}, {invoice.number}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

export default Month;
