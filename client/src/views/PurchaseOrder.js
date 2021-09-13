import React, { useState, useEffect } from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import * as FiIcons from "react-icons/fi";

function PurchaseOrder(props) {
  const { setSelected } = props;
  const [companyName, setCompanyName] = useState("");
  const [companyAddress1, setCompanyAddress1] = useState("");
  const [companyAddress2, setCompanyAddress2] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [fax, setFax] = useState("");
  const [date, setDate] = useState("");
  const [poNumber, setPONumber] = useState("");
  const [shippingName, setShippingName] = useState("");
  const [shippingAddress1, setShippingAddress1] = useState("");
  const [shippingAddress2, setShippingAddress2] = useState("");

  const [shippingPhone, setShippingPhone] = useState("");
  const [items, setItems] = useState([]);
  const [notes, setNotes] = useState("");

  const [itemNumber, setItemNumber] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [taxable, setTaxable] = useState(false);
  const [taxRate, setTaxRate] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [others, setOthers] = useState(0);

  useEffect(() => {
    setSelected("PO");
  });
  const handleAddProduct = (e) => {
    e.preventDefault();
    setItems([
      ...items,
      {
        itemNumber,
        itemDesc,
        quantity,
        unitPrice,
        taxable,
        unitTotal: quantity * unitPrice,
      },
    ]);
  };

  const handleSum = (arr) => {
    let total = 0;
    arr.forEach((item) => (total += item.unitTotal));
    return total;
  };

  const handleSumTaxable = (arr) => {
    let total = 0;
    arr
      .filter((item) => item.taxable === true)
      .forEach((item) => (total += item.unitTotal));
    return total;
  };

  const handleTax = (arr) => {
    const total = handleSumTaxable(arr);
    const tax = (total * (taxRate / 100)).toFixed(2);
    return tax;
  };

  const handleCalculateTotal = (arr) => {
    const subtotal = handleSum(arr);
    const tax = handleTax(arr);
    const total =
      Number(subtotal) + Number(tax) + Number(shipping) + Number(others);
    return total;
  };

  const handleDeleteProductItem = (indexId) => {
    setItems(items.filter((item, index) => index !== indexId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const total = handleCalculateTotal(items);
    axios
      .post(
        "http://localhost:8000/api/create",
        {
          number: poNumber,
          date: date,
          customerName: companyName,
          customerAddress: companyAddress1 + ", " + companyAddress2,
          shippingName: shippingName,
          shippingAddress: shippingAddress1 + ", " + shippingAddress2,
          shippingPhone: shippingPhone,
          shippingFee: shipping,
          price: total,
          contact: companyPhone,
          tel: companyPhone,
          fax: fax,
          discount: others,
          note: notes,
          products: items,
          taxRate: taxRate,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setSelected("home");
        navigate("/main");
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <div>
      <h1 className="PO m-4">new Purchase Order</h1>
      <form onSubmit={handleSubmit} className="poForm">
        <div className="break-line"></div>
        <div className="subContainer1">
          <div className="poBuyer">
            <h4>buyer info</h4>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Company Name"
              className="form-control"
            />
            <input
              type="text"
              value={companyAddress1}
              onChange={(e) => setCompanyAddress1(e.target.value)}
              placeholder="Street #"
              className="form-control"
            />
            <input
              type="text"
              value={companyAddress2}
              onChange={(e) => setCompanyAddress2(e.target.value)}
              placeholder="City, State, Zipcode"
              className="form-control"
            />
            <input
              type="text"
              value={companyPhone}
              onChange={(e) => setCompanyPhone(e.target.value)}
              placeholder="Company Phone"
              className="form-control"
            />
            <input
              type="text"
              value={fax}
              onChange={(e) => setFax(e.target.value)}
              placeholder="Fax"
              className="form-control"
            />
          </div>

          <div className="poInfo">
            <h4>purchase order info</h4>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="date"
              className="form-control"
            />
            <input
              type="text"
              value={poNumber}
              onChange={(e) => setPONumber(e.target.value)}
              placeholder="PO #"
              className="form-control"
            />
          </div>

          <div className="poShip">
            <h4>Ship to</h4>
            <input
              type="text"
              value={shippingName}
              onChange={(e) => setShippingName(e.target.value)}
              placeholder="Name"
              className="form-control"
            />
            <input
              type="text"
              value={shippingAddress1}
              onChange={(e) => setShippingAddress1(e.target.value)}
              placeholder="Street"
              className="form-control"
            />
            <input
              type="text"
              value={shippingAddress2}
              onChange={(e) => setShippingAddress2(e.target.value)}
              placeholder="City, State, Zipcode"
              className="form-control"
            />
            <input
              type="text"
              value={shippingPhone}
              onChange={(e) => setShippingPhone(e.target.value)}
              placeholder="phone"
              className="form-control"
            />
          </div>
        </div>
        <div className="poProductInput">
          <h4>input product</h4>
          <input
            type="text"
            value={itemNumber}
            onChange={(e) => setItemNumber(e.target.value)}
            placeholder="Item #"
            className="form-control"
          />
          <input
            type="text"
            value={itemDesc}
            onChange={(e) => setItemDesc(e.target.value)}
            placeholder="Description"
            className="form-control"
          />
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantity"
            className="form-control"
          />
          <input
            type="text"
            value={unitPrice}
            onChange={(e) => setUnitPrice(e.target.value)}
            placeholder="Unit Price"
            className="form-control"
          />
          <label htmlFor="taxable">
            <input
              className="form-check-input"
              type="checkbox"
              name="taxable"
              id="taxable"
              value={taxable}
              onChange={(e) => setTaxable(!taxable)}
            />
            <span style={{ paddingLeft: "15px" }}>taxable?</span>
          </label>
          <button
            style={{ display: "block", margin: "15px 0" }}
            className="btn btn-primary"
            onClick={handleAddProduct}
          >
            add product
          </button>
        </div>

        <div className="poProducts">
          <h4>Products</h4>
          <table className="poTable">
            <thead>
              <tr>
                <th>Item #</th>
                <th>Description</th>
                <th>QTY</th>
                <th>unit price</th>
                <th>Taxable</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={"product" + index}>
                  <td>{item.itemNumber}</td>
                  <td>{item.itemDesc}</td>
                  <td>{item.quantity}</td>
                  <td>{item.unitPrice}</td>
                  <td>{item.taxable ? "yes" : "no"}</td>
                  <td>{item.unitTotal}</td>
                  <td
                    className="deleteProduct"
                    onClick={() => handleDeleteProductItem(index)}
                  >
                    <FiIcons.FiDelete />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="poNotes">
          <textarea
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="comments or special instructions"
            className="form-control"
          />
        </p>
        <div className="tax-percent">%</div>
        <div className="poFooter">
          <div className="poSummary">
            <p>Subtotal: {handleSum(items)}</p>
            <p>Taxable: {handleSumTaxable(items)}</p>
            <p>
              Tax Rate:{" "}
              <input
                value={taxRate}
                className="form-control"
                onChange={(e) => setTaxRate(e.target.value)}
              />
            </p>
            <p>Tax: {handleTax(items)}</p>
            <p>
              shipping:{" "}
              <input
                style={{ width: "80px" }}
                type="text"
                className="form-control"
                value={shipping}
                onChange={(e) => setShipping(e.target.value)}
              />
            </p>
            <p>
              other:{" "}
              <input
                type="text"
                className="form-control"
                value={others}
                onChange={(e) => setOthers(e.target.value)}
              />
            </p>
            <p style={{ borderTop: "1px solid black" }}>
              Total: {handleCalculateTotal(items)}
            </p>
          </div>
        </div>

        <input
          type="submit"
          value="create"
          className="poSubmit btn btn-primary"
        />
      </form>
    </div>
  );
}

export default PurchaseOrder;
