const path = require("path");
const express = require("express");
var bodyParser = require("body-parser");

const statesJson = require("../data/state_data.json");

const app = express();
const port = process.env.PORT || 3000;

if (!process.env.NODE_ENV !== "production") {
  const webpack = require("webpack");
  const config = require("../webpack.config.development");
  const compiler = webpack(config);
  app.use(
    require("webpack-dev-middleware")(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath,
      hot: true
    })
  );
  app.use(
    require("webpack-hot-middleware")(compiler, {
      log: console.log,
      path: "/__webpack_hmr",
      heartbeat: 10 * 1000
    })
  );
}

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../path/index.html"));
});

app.get("/api/data", (req, res) => {
  res.send(JSON.stringify(statesJson));
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post("/api/sendData", (req, res) => {
  let data = req.body;
  console.log("INSIDE POST");
  console.log("Req.Body: ", req.body);
  if (!data) {
    return res
      .status(400)
      .send({ error: true, message: "Please submit form with correct data." });
  }
  return res.status(200).send({
    error: false,
    data: data,
    message: "You have submitted successfully"
  });
});

app.listen(port, function(err) {
  if (err) {
    return console.error(err);
  }

  console.log("Listening at port: ", port);
});
