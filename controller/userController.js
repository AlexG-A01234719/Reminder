const { userModel, Database } = require("../database")

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};

const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user, password) {
  return user.password === password;
}

function getUserbyGitHubIdOrCreate(profile) {
  let user = userModel.findById(profile.id);
  if (user) {
    return user;
  }
  let userObj = { id: profile.id, name: profile.username, email: profile.emails[0].value, reminders: [] }
  Database[profile.username] = userObj;
  return userObj;
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
  getUserbyGitHubIdOrCreate
};