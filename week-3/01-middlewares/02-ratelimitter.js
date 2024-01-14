const request = require("supertest");
const assert = require("assert");
const express = require("express");
const app = express();
// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will
// rate limit the requests from a user to only 5 request per second
// If a user sends more than 5 requests in a single second, the server
// should block them with a 404.
// User will be sending in their user id in the header as 'user-id'
// You have been given a numberOfRequestsForUser object to start off with which
// clears every one second

let numberOfRequestsForUser = {
  "user-id": "",
  count: 0,
  Time: new Date().getSeconds(),
};
setInterval(() => {
  numberOfRequestsForUser = {
    "user-id": "",
    count: 0,
    Time: new Date().getSeconds(),
  };
}, 1000);

app.use(middleware);

function middleware(req, res, next) {
  if (numberOfRequestsForUser["user-id"] == "") {
  
    numberOfRequestsForUser["user-id"] = req.headers["user-id"];
    numberOfRequestsForUser.count = numberOfRequestsForUser.count + 1;
    numberOfRequestsForUser.Time = new Date().getSeconds();
    console.log(numberOfRequestsForUser)
    next();
    return;
  }

  if (numberOfRequestsForUser["user-id"] == req.headers["user-id"]) {
    if (
      numberOfRequestsForUser.count < 5 &&
      numberOfRequestsForUser.Time == new Date().getSeconds()
    ) {
      numberOfRequestsForUser.count =  numberOfRequestsForUser.count + 1;
      console.log('less then 5: '+  numberOfRequestsForUser.count)
      next();
      return;
    } else {
      console.log('More then 5: '+ numberOfRequestsForUser.count)
      throw new Error("something went wrong");
      return;
    }
  }
}

app.get("/user", function (req, res) {
  res.status(200).json({ name: "john" });
});

app.post("/user", function (req, res) {
  res.status(200).json({ msg: "created dummy user" });
});

app.use((err, req, res, next) => {
  res.status(404).send(err);
});

module.exports = app;
