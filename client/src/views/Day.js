import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "@reach/router";

function Day(props) {
  const { setSelected } = props;
  const [invoices, setInvoices] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [date, setDate] = useState("");

  useEffect(() => {
    setSelected("day");
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:8000/api/viewByDay/" + date, {
        withCredentials: true,
      })
      .then((res) => {
        setInvoices(res.data);
        setLoaded(true);
      });
  };
  return (
    <div>
      <h1 className="p-4">Search Invoice by Date</h1>
      <form onSubmit={handleSubmit} className="p-4">
        <p>
          <input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </p>
        <input type="submit" value="search" className="btn btn-primary" />
      </form>
      {loaded && (
        <ul className="m-3 p-3">
          {invoices
            .sort((a, b) => {
              if (a.date < b.date) {
                return 1;
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

export default Day;
