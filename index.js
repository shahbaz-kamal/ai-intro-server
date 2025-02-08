require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 7800;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Ai introduction is running");
});
app.listen(port, () => {
  console.log("Ai server is running on port",port);
});
