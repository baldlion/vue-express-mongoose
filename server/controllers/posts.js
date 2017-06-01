import Post from '../models/post';

exports.index = function (req, res) {
  Post.find()
    .then(data => {
      res.json(data);
    });
};

exports.add = function (req, res) {

  res.send('yay!');

};