// dependencies
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("node:path");
const app = express();

// cors
app.use(
  cors({
    origin: "https://asseternity.github.io/",
    credentials: true,
  })
);

// settings
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// mounting routes
const apiRoute = require("./routes/apiRoute");
app.use("/api", apiRoute);

// launch
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is listening on port ${port}!`);
});
