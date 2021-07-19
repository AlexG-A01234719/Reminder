let database = require("../database").Database;

let remindersController = {
  list: (req, res) => {
    // added this code ⭐️
    const currentUser = req.user;
    res.render("reminder/index", {
      reminders: currentUser.reminders,
      currentUser,
    });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    const currentUser = req.user;
    let reminderToFind = req.params.id;
    let searchResult = currentUser.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: currentUser.reminders });
    }
  },

  create: (req, res) => {
    const currentUser = req.user;
    let reminder = {
      id: currentUser.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    currentUser.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    const currentUser = req.user;
    let reminderToFind = req.params.id;
    let searchResult = currentUser.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    const currentUser = req.user;
    let reminderToFind = req.params.id;
    currentUser.reminders.find(function (reminder) {
      if (reminder.id == reminderToFind) {
        reminder.title = req.body.title;
        reminder.description = req.body.description;
        reminder.completed = req.body.completed == "true";
      }
    });

    res.redirect("/reminders");
  },

  delete: (req, res) => {
    const currentUser = req.user;
    let reminderToFind = req.params.id;
    let foundIndex = currentUser.reminders.findIndex(
      (reminder) => reminder.id == reminderToFind
    );
    currentUser.reminders.splice(foundIndex, 1);
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
