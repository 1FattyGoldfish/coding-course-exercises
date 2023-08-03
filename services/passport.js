const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

// user is a mongoose model instance
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// reverse; turn id (user.id) into mongoose model instance
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    // (accessToken, refreshToken, profile, done) => {
    //   User.findOne({ googleId: profile.id }).then((existingUser) => {
    //     if (existingUser) {
    //       // we already have record of given idea
    //       done(null, existingUser);
    //     } else {
    //       //we don't have user record with this ID; make new record
    //       new User({ googleId: profile.id })
    //         .save()
    //         .then((user) => done(null, user));
    //     }
    //   });
    // }
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }

      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
