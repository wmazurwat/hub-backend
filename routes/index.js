var express = require("express");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
const ytdl = require("ytdl-core");
var router = express.Router();
ffmpeg.setFfmpegPath(ffmpegPath);
var { getMp3forURL, getInfo, getStream } = require("../utils/video");

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

router.post("/yt-new", async (req, res, next) => {
  const { url } = req.body;
  console.log("url", url);
  res.contentType("audio/mpeg");
  const stream = await getStream(url);
  ffmpeg({ source: stream })
    .format("mp3")
    // .audioBitrate("192k")
    .on("end", function () {
      console.log("file has been converted succesfully");
    })
    .on("error", function (err) {
      console.log("an error happened: " + err.message);
    })
    // save to stream
    .pipe(res, { end: true });
});

module.exports = router;
