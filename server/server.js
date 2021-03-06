const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const statesJson = require("../data/state_data.json");
const secretKeys = require("../secret_keys");

const app = express();
const port = process.env.NODE_ENV === "production" ? 80 : 3000;

let useFolder;
console.log("NODE_ENV: ", process.env.NODE_ENV);

if (process.env.NODE_ENV !== "production") {
  useFolder = "/public/";
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
} else {
  useFolder = "/dist/";
}
app.use(express.static("dist"));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, ".." + useFolder + "index.html"));
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
    to:
      process.env.NODE_ENV === "production"
        ? data.toEmail
        : "1.21gwprod@gmail.com",
    cc: data.sendCopy ? data.fromEmail : null,
    subject: "Smoking Vehicle Submission - Plate#: " + data.licensePlate,
    replyTo: data.userName + "<" + data.fromEmail + ">",
    html:
      "<p>Hello.<br>" +
      "I'd like to " +
      (data.anonymous ? "anonymously " : "") +
      "submit this smoking vehicle report.  " +
      "Here is the information I have: <br>" +
      "<ul>" +
      (data.date ? "<li>" + "Date: " + data.date + "</li>" : "") +
      "<li>" +
      "License Plate: " +
      data.licensePlate +
      "</li>" +
      "<li>" +
      "Vehicle Info: " +
      data.vehicleType +
      "</li>" +
      "<li>" +
      "Location: " +
      data.vehicleLocation +
      "</li>" +
      (data.engineType ? "<li>" + "Engine: " + data.engineType + "</li>" : "") +
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
    console.log(mailOptions);
    if (err) console.log(err);
    else console.log("successful email sent");
    return res.status(200).send({
      error: false,
      data: info.reponse,
      message: "You have submitted successfully"
    });
  });
});

app.post("/api/contact", (req, res) => {
  const data = req.body;
  if (!data) {
    return res
      .status(400)
      .send({ error: true, message: "Please submit form with correct data." });
  }

  const mailOptions = {
    from: data.fromEmail,
    to: "xhaustdapp@gmail.com",
    cc: data.fromEmail,
    subject: "Xhaustd App Contact Form",
    html:
      "<p>Hello.<br>" +
      "I am submitting information as a comment/question/concern:" +
      "<ul>" +
      "<li>" +
      data.fromEmail +
      "</li>" +
      "<li>" +
      data.userName +
      "</li>" +
      "<li>" +
      data.contactInfo +
      "</li>" +
      "</ul>" +
      "<p>Thank you.</p>" +
      "<p>Xhaustd App will respond if required as soon as possible.</p>"
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
