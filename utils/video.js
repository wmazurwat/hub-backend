const ytdl = require("ytdl-core");
const ffmpeg = require("fluent-ffmpeg");
const getStream = async (url) => {
  return await ytdl(url, { filter: "audioonly" });
};

const convertToMp3 = async (stream, title) => {
  return new Promise((resolve, reject) => {
    try {
      ffmpeg({ source: stream })
        .output(`${title}.mp3`)
        .audioBitrate("192k")
        .run();
      return resolve(`${title}.mp3`);
    } catch {
      reject();
    }
  });
};

const getInfo = async (url) => {
  const response = await ytdl.getBasicInfo(url);
  const info = response.videoDetails.title;
  return info;
};

const getMp3forURL = async (url) => {
  const info = await getInfo(url);
  console.log("here 1", info);
  const stream = await getStream(url);
  console.log("here 2");
  const mp3 = await convertToMp3(stream, info);
  console.log("done");
  return mp3;
};

module.exports = {
  getMp3forURL,
  getInfo,
  getStream,
};
