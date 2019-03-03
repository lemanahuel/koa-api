
const Cloudinary = require('cloudinary');
const async = require('async');

Cloudinary.config({
  url: process.env.CLOUDINARY_URL
});

module.exports = class Cloudy {

  static uploadImages(images) {
    return new Promise((resolve, reject) => {
      let uploaded = [];
      async.each(images.file, (file, cb) => {
        if (file && file.path) {
          Cloudinary.uploader.upload(file.path, res => {
            uploaded.push({
              url: res.url ? res.url.replace(/http:\/\//, 'https://') : res.url
            });
            cb(null);
          });
        } else {
          cb(null);
        }
      }, err => {
        if (!err) {
          return resolve(uploaded);
        }
        return reject(err);
      });
    });
  }

}