const userModel = require("../database").userModel;

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
  userModel.Database[profile.name] = {
    id: profile.id,
    name: profile.username,
    email: profile.emails[0].value,
    reminders: []
}}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
  getUserbyGitHubIdOrCreate
};