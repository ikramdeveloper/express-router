const path = require("path");
const express = require("express");
const router = express.Router();
const data = {};
data.employees = require("../../data/employees.json");

router
  .route("/")
  .get((req, resp) => {
    resp.json(data.employees);
  })
  .post((req, resp) => {
    resp.json({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
  });

router
  .route("/:id")
  .get((req, resp) => {
    const singleEmployee = data.employees.find(
      (emp) => emp.id == req.params.id
    );
    resp.json(singleEmployee);
  })
  .put((req, resp) => {
    resp.json({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
  })
  .delete((req, resp) => {
    resp.json({ id: req.params.id });
  });

module.exports = router;
