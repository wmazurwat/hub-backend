var express = require('express');
const ytdl = require('ytdl-core');
var router = express.Router();
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/yt', function(req, res, next) {
  console.log(req.body.url)
  ytdl(req.body.url)
    .pipe(fs.createWriteStream('video.mp4'))
  res.sendFile('video.mp4', { root: '.' });
});


module.exports = router;
