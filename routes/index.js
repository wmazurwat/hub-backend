var express = require("express");
const ytdl = require("ytdl-core");
var router = express.Router();
const fs = require("fs");
var getMp3forURL = require("../utils/video");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/yt", async (req, res, next) => {
  try {
    const file = await getMp3forURL(req.body.url);
    res.sendFile(file, { root: "." });
  } catch (e) {
    console.log("e", e);
  }
});

router.post("/yt-info", async (req, res, next) => {
  let info = await ytdl.getBasicInfo(req.body.url);
  res.send(info);
});

module.exports = router;
