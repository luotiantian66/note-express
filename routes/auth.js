var express = require('express');
var router = express.Router();

var passport = require('passport')
var GitHubStrategy = require('passport-github').Strategy;

passport.serializeUser(function(user, done) {
	//console.log('serializing')
	//console.log(user)
    done(null, user);
});
 
passport.deserializeUser(function(id, done) {
  // User.findById(id, function (err, user) {
  // 	console.log('deserializing')
  //   done(err, user);
  // });
  // console.log('deserializing')
  //console.log('deserializing')
  done(null, id)
  //console.log(id)
});

 
passport.use(new GitHubStrategy({
    clientID: 'bedb43149de8f4336a60',
    clientSecret: 'fd396440de9eaebeb768268db014aeedf349b1ca',
    callbackURL: "http://localhost:9000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });  
    done(null,profile)
  }
));

router.get('/github',
  passport.authenticate('github'));
 
router.get('/github/callback', 
    
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home. 
    //console.log(req.user)
    req.session.user = {
      id: req.user._json.id,
      username: req.user._json.login,
      avatar: req.user._json.avatar_url
    }
    res.redirect('/')
  });

router.get('/logout',function(req,res,next){
  req.session.destroy()
  res.redirect('/')
})

// function(req,res,next){
//   var code = req.query.code
//   console.log(code)
// }

module.exports = router;
