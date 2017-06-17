import bcrypt from 'bcrypt'
import User from '../models/user'

exports.index = function (req, res) {
  res.render('auth')
}

exports.authenticate = async function (req, res) {
  const email = req.body.email
  const password = req.body.password

  const user = await User.findOne({email: email})

  if (!user) {
    res.json({
      success: false,
      error: 'Invalid.'
    })
  } else {
    const matchedPassword = await bcrypt.compare(password, user.password)

    if (!matchedPassword) {
      res.json({
        success: false,
        error: 'Invalid.'
      })
    } else {
      req.session.userId = user._id
      res.json({
        success: true
      })
    }
  }
}

exports.logout = function (req, res) {
  req.session.destroy()
  res.redirect('/admin/auth')
}

exports.isNotLoggedIn = function (req, res, next) {
  if (req.session.userId) {
    User.findOne({_id: req.session.userId}).then(user => {
      if (user) {
        res.redirect('/admin')
      } else {
        req.session.destroy()
        next()
      }
    })
  } else {
    next()
  }
}
