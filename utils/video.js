const ytdl = require("ytdl-core");
const ffmpeg = require("fluent-ffmpeg");
const getStream = async (url) => {
  let allReceived = false;
  return await ytdl(url, { filter: "audioonly" });
  return new Promise((resolve, reject) => {
    const stream = ytdl(url, { filter: "audioonly" })
      .on("progress", (_, totalDownloaded, total) => {
        console.log("totalDownloaded: " + totalDownloaded);
        if (!allReceived) {
          console.log("total: " + total);
          // progressBar.start(total, 0, {
          //   mbTotal: (total / 1024 / 1024).toFixed(2),
          //   mbValue: 0,
          // });
          allReceived = true;
        }
        // progressBar.increment();
        // progressBar.update(totalDownloaded, {
        //   mbValue: (totalDownloaded / 1024 / 1024).toFixed(2),
        // });
      })
      .on("end", () => {
        // progressBar.stop();
        console.log("end");
        resolve(stream);
      });
  });
};

const convertToMp3 = async (stream, title) => {
  return new Promise((resolve, reject) => {
    ffmpeg({ source: stream })
      .output(`${title}.mp3`)
      .audioBitrate("192k")
      .run();
    return resolve(`${title}.mp3`);
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

module.exports = getMp3forURL;
