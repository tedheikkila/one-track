
// withAuth validates if the user is logged in and if not redirects to login (for profile pg)
const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};


module.exports = withAuth;