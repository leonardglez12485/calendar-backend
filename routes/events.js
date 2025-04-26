const express = require("express");
const routes = express.Router();
const { check } = require("express-validator");
const {
  createEvents,
  getEvents,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");
const { fieldValidator } = require("../middlewares/field-validators");
const { tokenValidator } = require("../middlewares/token-validato");
const { isDate } = require("../helpers/isDate");

//* Middleware to validate token for all routes */
routes.use(tokenValidator);

routes.post(
  "/",
  [
    check("title", "Title is required").not().isEmpty(),
    check("start", "Start date is required").isISO8601(),
    check("end", "End date is required").isISO8601(),
    fieldValidator,
  ],
  createEvents
);

routes.get("/", getEvents);

routes.put(
  "/:id",
  [
    check("title", "Title is required").not().isEmpty(),
    check("start", "Start date is required").isISO8601(),
    check("end", "End date is required").isISO8601(),
    fieldValidator,
  ],
  updateEvent
);
routes.delete("/:id", deleteEvent);

module.exports = routes;
