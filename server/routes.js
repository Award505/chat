const roomController = require("./controllers/roomcontroller");
const express = require("express");
const router = express.Router();

router.get("/chat", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  res.send("Chat not gpt");
});

router.get("/api/rooms", roomController.getRooms);

module.exports = router;
