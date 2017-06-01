import bcrypt from 'bcrypt';
import User from '../models/user';

exports.index = function (req, res) {
  res.render('auth');
};

exports.authenticate = function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }).then(matchedUser => {
    if (!matchedUser) {
      res.json({
        success: false,
        error: 'Invalid.'
      });
    } else {
      bcrypt.compare(password, matchedUser.password).then(matchedPassword => {
        if (!matchedPassword) {
          res.json({
            success: false,
            error: 'Invalid.'
          });
        } else {
          req.session.user = matchedUser;
          res.json({
            success: true
          });
        }
      });
    }
  });

};

exports.logout = function (req, res) {
  req.session.destroy();

  res.redirect('/auth');
};

exports.checkAuthorization = function (req, res, next) {
  if (req.session.user) {
    res.redirect('/admin');
  } else {
    next();
  }
};