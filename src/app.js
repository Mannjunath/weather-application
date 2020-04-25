const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const publicpath = express.static(path.join(__dirname, "../public"));
const templatepath = path.join(__dirname, "../templates/views");
const partialspath = path.join(__dirname, "../templates/partials");

const PORT = process.env.PORT || 4000;

app.set("view engine", "hbs");
app.set("views", templatepath);
hbs.registerPartials(partialspath);

app.use(publicpath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Ramasamudra",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Us",
    name: "Ramasamudra",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Me",
    name: "Ramasamudra",
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must enter search term",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address require",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          location,
          forecast: forecastData,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Ramasamudra",
    error_msg: "Help Artical not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Andriew",
    error_msg: "Page Not Found",
  });
});

app.listen(PORT, () =>
  console.log(`App successfull running in the port ${PORT} `)
);
