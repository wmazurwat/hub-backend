var express = require('express');
const ytdl = require('ytdl-core');
var router = express.Router();
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/yt', async (req, res, next) => {

  await ytdl(req.body.url)
    .pipe(fs.createWriteStream('video2.mp4'))
  res.sendFile('video2.mp4', { root: '.' });
});

router.get('/yt', async (req, res, next) => {
  // console.log(req.body.url)
  // await ytdl('https://www.youtube.com/watch?v=hDMg6lBsCAU')
  //   .pipe(fs.createWriteStream('video2.mp4'))
  res.sendFile('video2.mp4', { root: '.' });
});



router.post('/yt-info', async (req, res, next) => {
  let info = await ytdl.getInfo(req.body.url);
  let audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
  res.send(audioFormats);
});




module.exports = router;
