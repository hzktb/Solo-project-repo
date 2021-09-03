import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "@reach/router";

function SearchByName(props) {
  const { setSelected } = props;
  const [name, setName] = useState("");
  const [invoices, setInvoices] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setSelected("searchByName");
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:8000/api/viewByName/" + name, {
        withCredentials: true,
      })
      .then((res) => {
        setInvoices(res.data);
        setLoaded(true);
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <div>
      <h1 className="p-4">Search Invoices by Cutomer Name</h1>
      <form className="p-4" onSubmit={handleSearch}>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Customer Name"
        />
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
                <Link to={"/invoices/details/" + invoice._id}>
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

export default SearchByName;
