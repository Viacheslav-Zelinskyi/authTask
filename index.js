const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const jsonParser = bodyParser.json();
const port = process.env.PORT;
const db = require("./db");
const { googleAuth, facebookAuth } = require("./functions/verifications");
const createUser = require("./functions/createUser");
var cors = require("cors");

app.use(cors());

const dateObj = new Date();
const dateString =
  ("0" + dateObj.getDate()).slice(-2) +
  "." +
  ("0" + (dateObj.getMonth() + 1)).slice(-2) +
  "." +
  dateObj.getFullYear();

app.use('/', express.static(path.join(__dirname, "client/build")));

app.get('/userPage', function(req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, '/client/build/')});
});

app.get('/loginPage', function(req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, '/client/build/')});
});

app.post("/auth/google", jsonParser, (req, res) => {
  const social_id = req.body.social_id;
  const name = req.body.name;
  const social_network = req.body.social_network;

  googleAuth(req.body.token)
    .then((authData) =>
      createUser(db, dateString, social_id, name, social_network, res)
    )
    .catch((err) => res.send("Auth error" + err));
});

app.post("/auth/facebook", jsonParser, (req, res) => {
  const social_id = req.body.social_id;
  const name = req.body.name;
  const social_network = req.body.social_network;

  facebookAuth(req.body.token)
    .then((authData) =>
      createUser(db, dateString, social_id, name, social_network, res)
    )
    .catch((err) => res.send("Auth error" + err));
});

app.get("/users/number", (req, res) => {
  db.query(
    "SELECT COUNT(social_network) FROM users WHERE social_network='google'",
    (err, googleCount) => {
      db.query(
        "SELECT COUNT(social_network) FROM users WHERE social_network='facebook'",
        (err, facebookCount) => {
          res.send({
            google: googleCount?.rows[0].count,
            facebook: facebookCount?.rows[0].count,
          });
        }
      );
    }
  );
});

app.get("/users", (req, res) => {
  switch (req.param("social_network")) {
    case "facebook":
      facebookAuth(req.param("token"))
        .then((authData) =>
          db.query("SELECT * FROM users", (err, result) =>
            res.send(result.rows)
          )
        )
        .catch((err) => res.send("Auth error" + err));
      break;
    case "google":
      googleAuth(req.param("token"))
        .then((authData) =>
          db.query("SELECT * FROM users", (err, result) =>
            res.send(result.rows)
          )
        )
        .catch((err) => res.send("Auth error" + err));
      break;
    default:
      res.send("Error");
      break;
  }
});

app.delete("/users", jsonParser, (req, res) => {
  switch (req.body.social_network) {
    case "facebook":
      facebookAuth(req.body.token)
        .then((authData) =>
          req.body.social_id.map((item) =>
            db.query(
              "DELETE FROM users WHERE social_id=$1",
              [item],
              (err, result) => res.send(result.rows)
            )
          )
        )
        .catch((err) => res.send("Auth error" + err));
      break;
    case "google":
      googleAuth(req.body.token)
        .then((authData) =>
          req.body.social_id.map((item) =>
            db.query(
              "DELETE FROM users WHERE social_id=$1",
              [item],
              (err, result) => res.send(result.rows)
            )
          )
        )
        .catch((err) => res.send("Auth error" + err));
      break;
  }
});

app.patch("/users/block", jsonParser, (req, res) => {
  switch (req.body.social_network) {
    case "facebook":
      facebookAuth(req.body.token)
        .then((authData) =>
          req.body.social_id.map((item) =>
            db.query(
              "UPDATE users SET status='blocked' WHERE social_id=$1",
              [item],
              (err, result) => res.send(result.rows)
            )
          )
        )
        .catch((err) => res.send("Auth error" + err));
      break;
    case "google":
      googleAuth(req.body.token)
        .then((authData) =>
          req.body.social_id.map((item) =>
            db.query(
              "UPDATE users SET status='blocked' WHERE social_id=$1",
              [item],
              (err, result) => res.send(result.rows)
            )
          )
        )
        .catch((err) => res.send("Auth error" + err));
      break;
    default:
      return res.send("Error");
      break;
  }
});

app.patch("/users/unblock", jsonParser, (req, res) => {
  switch (req.body.social_network) {
    case "facebook":
      facebookAuth(req.body.token)
        .then((authData) =>
          req.body.social_id.map((item) =>
            db.query(
              "UPDATE users SET status='active' WHERE social_id=$1",
              [item],
              (err, result) => res.send(result.rows)
            )
          )
        )
        .catch((err) => res.send("Auth error" + err));
      break;
    case "google":
      googleAuth(req.body.token)
        .then((authData) =>
          req.body.social_id.map((item) =>
            db.query(
              "UPDATE users SET status='active' WHERE social_id=$1",
              [item],
              (err, result) => res.send(result.rows)
            )
          )
        )
        .catch((err) => res.send("Auth error" + err));
      break;
    default:
      return res.send("Error");
      break;
  }
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
