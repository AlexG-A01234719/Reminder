let database = require("../database").Database;
const fetch = require('node-fetch');



let remindersController = {
  list: async (req, res) => {
    // Talk to unspash

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

  lucky: (req, res) => {
    const client_id = process.env.UNSPLASH_KEY;
    fetch(`https://api.unsplash.com/photos/random?client_id=${client_id}`)
      .then((res) => res.json())
      .then((json) => res.redirect(json.urls.regular));
  }
};



module.exports = remindersController;
