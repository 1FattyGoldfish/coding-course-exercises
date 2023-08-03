const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport"); // const passportConfig = not needed since not exporting anything from file

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());

// tell passport to keep track of users by using cookies
// enable cookies and tell express to care about cookies with cookieSession
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // milliseconds; maximum time cookies will be kept (30 days)
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());

// const authRoutes = require('./routes/authRoutes')
// authRoutes(app); after defining app
require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);

if (process.env.NODE_ENV === "production") {
  // express will serve up production assets like our main.js or main.css file
  app.use(express.static("client/build"));

  // express will serve up index.html file if it doesn't recognize route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);

// cookie-session vs express-session
// cookie-session stores 14 kb (max) of data and stores user data directly in cookie
// express-session stores session-id into cookie, which leads to external db with user info
// - can hold a lot more information since cookie only holds session-id
// - requires another set-up of a database (e.g. azure); more complicated
