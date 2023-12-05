const express = require("express");
const app = express();
const PORT = 3000;

const client = require("./db/client.cjs");
client.connect();

app.get("/", (req, res, next) => {
  res.send("TESTING!");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})