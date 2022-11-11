const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();

var corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200, 
  };
  
app.use(cors());

app.use(
    bodyParser.urlencoded({
      extended: false,
    })
  );

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));

const { sequelize } = require("./models");

app.get("/", (req, res) => {
    console.log(req);
    res.send("Hello World");
  });
  

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    try {
      sequelize.authenticate();
      console.log("[+] Listening on PORT: " + PORT);
    } catch (err) {
      console.log("[+] ERROR: Could not connect to DB.");
    }
  });
  