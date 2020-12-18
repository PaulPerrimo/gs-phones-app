const express = require("express");
const bodyParser = require("body-parser");

const fs = require("fs");
const path = require("path");

const mongoose = require("mongoose");

const HttpError = require("./models/http-error");

const phonesAPI = require("./api/phones-routes");

const app = express();

app.use(bodyParser.json());

app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE");

  next();
});

app.use("/api/phones", phonesAPI);

app.use((req, res, next) => {
  throw new HttpError("Could not find this route.", 404);
});

app.use((error, req, res, next) => {
  if (req.file)
    fs.unlink(req.file.path, (err) => {
      console.error(err);
    });
  if (res.headerSent) return next(error);
  res.status(error.code || 500);
  res.json({ message: error.message || "And unknown error occurred!" });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_PHONE}:${process.env.DB_PASSWORD}@cluster0.pa7bx.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => app.listen(process.env.PORT || 5000))
  .catch((err) => console.error(err));
