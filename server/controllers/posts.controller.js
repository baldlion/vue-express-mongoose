import Post from '../models/post'

exports.index = function (req, res) {
  Post.find()
    .sort({
      publishedAt: 'desc'
    })
    .then(data => {
      res.json(data)
    })
}
