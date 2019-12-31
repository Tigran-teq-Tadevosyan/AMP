const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const uuidv1 = require("uuid/v1");
const fs = require("fs");

app.use(express.json({ limit: "100mb" }));

app.post("/new", (req, res) => {
  let newName = uuidv1();
  fs.appendFile("./www/" + newName + ".html", req.body.html, function(err) {
    if (err) throw err;
    res.redirect("/" + newName + ".html");
  });
});

app.use(express.static("www"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
