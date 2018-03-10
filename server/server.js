const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const statesJson = require("../data/state_data.json");
const secretKeys = require("../secret_keys");

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
  const data = req.body;
  if (!data) {
    return res
      .status(400)
      .send({ error: true, message: "Please submit form with correct data." });
  }

  const mailOptions = {
    from: data.fromEmail,
    // to: data.toEmail,
    to: "1.21gwprod@gmail.com", //** SWAP TO FIELD FOR PROD */
    cc: data.sendCopy ? data.fromEmail : null,
    bcc: "xhaustdapp@gmail.com",
    subject: "Smoking Vehicle Submission",
    replyTo: data.fromEmail,
    html:
      "<p>Hello.<br>" +
      "I'd like to " +
      (data.anonymous ? "anonymously " : "") +
      "submit this smoking vehicle report.  " +
      "Here is the information I have: <br>" +
      "<ul>" +
      "<li>" +
      data.licensePlate +
      "</li>" +
      "<li>" +
      data.vehicleType +
      "</li>" +
      "<li>" +
      data.vehicleLocation +
      "</li>" +
      "</ul>" +
      "Thank you!<br>" +
      data.userName +
      "</p>"
  };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: secretKeys.email.user,
      pass: secretKeys.email.pass
    }
  });

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) console.log(err);
    else console.log("successful email sent");
    return res.status(200).send({
      error: false,
      data: info.reponse,
      message: "You have submitted successfully"
    });
  });
});

app.listen(port, function(err) {
  if (err) {
    return console.error(err);
  }

  console.log("Listening at port: ", port);
});
