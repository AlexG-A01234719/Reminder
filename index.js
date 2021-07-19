const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");
const passport = require("./middleware/passport");

//⭐️ ======== added this code============= ⭐️
const session = require("express-session");
const {
  ensureAuthenticated,
  forwardAuthenticated,
} = require("./middleware/checkAuth");

//⭐️ ======== added this code============= ⭐️
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
//⭐️ ====================================== ⭐️

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

app.use(ejsLayouts);

app.set("view engine", "ejs");

// Routes start here

app.get("/reminders", ensureAuthenticated, reminderController.list);

app.get("/reminder/new", ensureAuthenticated, reminderController.new);

app.get("/reminder/:id", ensureAuthenticated, reminderController.listOne);

app.get("/reminder/:id/edit", ensureAuthenticated, reminderController.edit);

app.post("/reminder/", ensureAuthenticated, reminderController.create);

app.post(
  "/reminder/update/:id",
  ensureAuthenticated,
  reminderController.update
);

app.post(
  "/reminder/delete/:id",
  ensureAuthenticated,
  reminderController.delete
);

// Fix this to work with passport! The registration does not need to work, you can use the fake database for this.
app.get("/register", authController.register);
app.get("/login", forwardAuthenticated, authController.login);

//==== added this code====
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/reminders",
    failureRedirect: "/login",
  })
);

app.get(
  "/github",
  passport.authenticate("github", {
    successRedirect: "/reminders",
    failureRedirect: "/login"
  })
)

app.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/login"
  }),
  function (req, res) {
    
    res.redirect("/reminders")
  }
)

//==== added this code====
app.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/login");
});

app.listen(3000, function () {
  console.log(
    "Server running. Visit: localhost:3000/reminders in your browser 🚀"
  );
});
