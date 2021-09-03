const Invoices = require("../models/invoice.model");

module.exports = {
  viewAll: (req, res) => {
    Invoices.find()
      .then((allInvoice) => res.json(allInvoice))
      .catch((err) => res.json(err));
  },

  viewByYear: (req, res) => {
    const { year } = req.params;
    Invoices.find({
      date: {
        $gte: `${year}-01-01`,
        $lte: `${year}-12-31`,
      },
    })
      .then((invocies) => res.json(invocies))
      .catch((err) => res.json(err));
  },

  viewByMonth: (req, res) => {
    const { year } = req.params;
    let { month } = req.params;
    if (month.length < 2) {
      month = "0" + month;
    }
    Invoices.find({
      date: {
        $gte: `${year}-${month}-01`,
        $lte: `${year}-${month}-31`,
      },
    })
      .then((invoices) => res.json(invoices))
      .catch((err) => res.json(err));
  },

  viewByDay: (req, res) => {
    const { date } = req.params;
    Invoices.find({
      date: date,
    })
      .then((invoices) => res.json(invoices))
      .catch((err) => res.json(err));
  },

  searchByName: (req, res) => {
    const { name } = req.params;
    Invoices.find({
      customerName: name,
    })
      .then((invoices) => res.json(invoices))
      .catch((err) => res.json(err));
  },

  create: (req, res) => {
    Invoices.create(req.body)
      .then((invoice) => res.json(invoice))
      .catch((err) => res.status(400).json(err));
  },

  findOne: (req, res) => {
    Invoices.findOne({ _id: req.params.id })
      .then((founded) => res.json(founded))
      .catch((err) => res.status(400).json(err));
  },

  update: (req, res) => {
    Invoices.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    })
      .then((updated) => res.json(updated))
      .catch((err) => res.status(400).json(err));
  },

  delete: (req, res) => {
    Invoices.deleteOne({ _id: req.params.id })
      .then((result) => res.json(result))
      .catch((err) => res.status(400).json(err));
  },
  deleteAll: (req, res) => {
    Invoices.deleteMany()
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  },
};
