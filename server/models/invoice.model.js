const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema(
  {
    number: {
      type: String,
      required: [true, "The order number is required"],
    },

    date: {
      type: Date,
      required: [true, "The order's date is required"],
    },

    customerName: {
      type: String,
      required: [true, "The customer name is required"],
    },

    customerAddress: {
      type: String,
      required: [true, "The customer address is required"],
    },

    shippingName: {
      type: String,
      required: [true, "The shipping name is required"],
    },

    shippingAddress: {
      type: String,
      required: [true, "The shipping address is required"],
    },

    shippingPhone: {
      type: String,
      required: [true, "The shipping phone required"],
    },

    shippingFee: Number,

    price: Number,

    contact: String,

    tel: {
      type: String,
      required: [true, "The customer's phone is required"],
    },

    fax: String,

    email: String,

    poStatus: String,

    discount: String,

    note: String,

    products: {
      type: Array,
    },

    taxRate: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", InvoiceSchema);
