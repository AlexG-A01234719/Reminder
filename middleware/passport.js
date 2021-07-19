const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const userController = require("../controller/userController");

const GITHUB_CLIENT_ID = "1e8d4fb6a38677d2c355"
const GITHUB_CLIENT_SECRET = "e3f1cb6faf5b9c8cfe1b54adee82db49024fc229"
const GITHUB_CALLBACK_URL = "http://localhost:3000/auth/github/callback"

const localLogin = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user)
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
);

const githubLogin = new GitHubStrategy(
  {
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: GITHUB_CALLBACK_URL,
    scope: ["user:email"]
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    let user = userController.getUserbyGitHubIdOrCreate(profile);
    return done(null, user);
  }
)

passport.serializeUser(function (user, done) {
  done(null, user.id);
});``

passport.deserializeUser(function (id, done) {
  let user = userController.getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

module.exports = passport.use(localLogin).use(githubLogin);

/*
What I have tried:
-create oauth app authorization on github to get client id and secret
-add a button on login.ejs that submits a get request for GitHub login
-create routes in index.js that redirects to github login strategy 
-get profile data from github login user
-attempted to add getUserbyGitHubIdOrCreate function to add profile data to database
*/