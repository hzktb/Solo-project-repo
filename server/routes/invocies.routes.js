const InvoicesController = require("../controllers/invoice.controller");
const { authenticate } = require("../middleware/jwt.middleware");

module.exports = (app) => {
  app.get("/api/viewByYear/:year", authenticate, InvoicesController.viewByYear);
  app.get(
    "/api/viewByMonth/:year/:month",
    authenticate,
    InvoicesController.viewByMonth
  );
  app.get("/api/viewByDay/:date", authenticate, InvoicesController.viewByDay);
  app.get("/api/all", authenticate, InvoicesController.viewAll);
  app.get("/api/invoices/:id", authenticate, InvoicesController.findOne);
  app.get(
    "/api/viewByName/:name",
    authenticate,
    InvoicesController.searchByName
  );
  app.post("/api/create", authenticate, InvoicesController.create);
  app.put("/api/update/:id", authenticate, InvoicesController.update);
  app.delete("/api/delete/:id", authenticate, InvoicesController.delete);
  app.delete("/api/deleteAll", authenticate, InvoicesController.deleteAll);
};
