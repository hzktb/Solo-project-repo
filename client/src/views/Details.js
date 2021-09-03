import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "@reach/router";

function Details(props) {
  const { id, setSelected } = props;
  const [invoice, setInvoice] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/invoices/" + id, {
        withCredentials: true,
      })
      .then((res) => {
        setInvoice(res.data);
        setLoaded(true);
        setSelected("details");
      });
  }, []);
  return (
    <div
      className="dropdown-menu-active dropdown-menu-macos shadow-lg p-4"
      style={{ position: "relative", top: "5rem" }}
    >
      {loaded && (
        <>
          <h1>
            Invoice: {invoice.customerName}, {invoice.date.slice(0, 10)}
          </h1>
          <div className="subWrapper">
            <ul>
              <li key="date">Date: {invoice.date.slice(0, 10)}</li>
              <li key="poNumber">PO #: {invoice.number}</li>
            </ul>
            <ul>
              <li key="customerInfo" style={{ fontWeight: "700" }}>
                Customer Information
              </li>
              <li key="cName">Name: {invoice.customerName}</li>
              <li key="cAddress">Address: {invoice.customerAddress}</li>
              <li key="cPhone">Phone: {invoice.tel}</li>
              <li key="cFax">Fax: {invoice.fax}</li>
              <li key="cEmail">Email: {invoice.email}</li>
              <li key="cPerson">Contact Person: {invoice.contact}</li>
            </ul>
            <ul>
              <li key="shipInfo" style={{ fontWeight: "700" }}>
                Shipping Info
              </li>
              <li key="sName">Name: {invoice.shippingName}</li>
              <li key="sAddress">Address: {invoice.shippingAddress}</li>
              <li key="sPhone">Phone: {invoice.shippingPhone}</li>
            </ul>
            <ul>
              <li key="productInfo" style={{ fontWeight: "700" }}>
                Products
              </li>
              <li key="total">Total Price (includes tax): {invoice.price}</li>
              {invoice.products.map((item, index) => (
                <li key={"item" + index}>
                  Item: {item.itemDesc}, QTY: {item.quantity}, Unit Price:{" "}
                  {item.unitPrice}, Item Total: {item.unitTotal}
                </li>
              ))}
              <li key="notes">Special requirements: {invoice.note}</li>
            </ul>
          </div>
          <Link
            to={"/invoices/update/" + id}
            className="btn btn-primary"
            style={{ position: "absolute", left: "30vw", top: "-7vh" }}
          >
            Update
          </Link>
        </>
      )}
    </div>
  );
}

export default Details;
