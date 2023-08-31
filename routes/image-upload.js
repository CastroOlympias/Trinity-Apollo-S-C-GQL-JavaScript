const express = require('express');
const router = express.Router();
const multer = require('multer');
const AWS = require('aws-sdk');
const paramsConfig = require('../configuration/params-config');

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
});

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, '');
  },
});

// image is the key!
const upload = multer({ storage }).single('image');

router.post('/image-upload', upload, (req, res) => {
  // console.log("post('/api/image-upload'", req.file);
  const params = paramsConfig(req.file);
  // console.log(params)
  s3.upload(params, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    res.json(data);
  });
});

// router.get("/image-delete", (req, res) => {
//   const params = {
//     Bucket: process.env.S3_BUCKET,
//     Key: '3dfa2aa3-c284-4080-b258-6c12aad46c33.jpg'
//   };
//   s3.deleteObject(params, (error, data) => {
//     if (error) {
//       res.status(500).send(error)
//     }
//     res.status(200).send("file is now deleted, I think")
//   })
// })

module.exports = router;