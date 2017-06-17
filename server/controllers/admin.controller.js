import path from 'path'
import User from '../models/user'
import Post from '../models/post'
import formidable from 'formidable'

exports.index = function (req, res) {
  res.render('admin', {
    user: JSON.stringify(req.user)
  })
}

exports.authenticate = function (req, res, next) {
  if (!req.session.userId) {
    res.redirect(`/admin/auth?from=${req.path}`)
  } else {
    User.findOne({_id: req.session.userId}, 'name email').then(user => {
      if (user) {
        req.user = user
        next()
      } else {
        req.session.destroy()
        res.redirect(`/admin/auth?from=${req.path}`)
      }
    })
  }
}

exports.upload = function (req, res) {
  const io = req.io
  const form = new formidable.IncomingForm()

  /* global __dirname */
  form.keepExtensions = true
  form.uploadDir = path.join(__dirname, '..', '..', '/content/images')

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log(err)
    }
  })

  form.on('progress', (bytesReceived, bytesExpected) => {
    io.emit('file upload progress', (bytesReceived / bytesExpected).toFixed(2))
  })

  form.on('error', (err) => {
    console.log('upload image form error', err)
  })

  form.on('file', function (field, file) {
    // fs.rename(file.path, `${form.uploadDir}/${file.name}`)
  })

  form.on('end', function (fields, files) {
    let filename = this.openedFiles[0].path.split('/').pop()
    let path = `/images/${filename}`

    res.json({
      success: true,
      url: path
    })
  })
}

exports.newPost = function (req, res) {
  console.log('asdf')
  res.json(new Post())
}

exports.getPostById = function (req, res) {
  Post.findOne({
    _id: req.params.id
  }).then(data => {
    res.json(data)
  })
}
