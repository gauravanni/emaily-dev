const passport=require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose=require('mongoose');
const Keys=require('../config/key');

const User=require('../models/User');

passport.serializeUser((user,done)=>{
  done(null,user.id);
});

passport.deserializeUser((id,done)=>{
  User.findById(id).then((user)=>{
    done(null,user);
  });
})

passport.use(
    new GoogleStrategy({
    clientID:Keys.clientID,
    clientSecret:Keys.clientSecret,
    callbackURL: '/auth/google/callback'
  },(accessToken, refreshToken, profile, done)=>{
    User.findOne({googleId:profile.id})
      .then((user)=>{
        if(user){
            done(null,user)
        }
        else{
          new User({googleId:profile.id}).save().then((user)=>done(null,user));
        }
    });

    

  })
);