import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import passport from 'passport';
const router = express.Router();
import GoogleStrategy  from 'passport-google-oauth20';
import User from '../models/User.js';


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  async function(accessToken, refreshToken, profile, done) {
    //console log profile and see what information is available
    const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        profileImage: profile.photos[0].value,
    }

    try {
        let user = await User.findOne( {googleId: profile.id});

        if(user){
            done(null,user);
        } else {
            user = await User.create(newUser);
            done(null,user);
        }
    } catch (error) {
        console.log(error)
    }
  }
));

router.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] }));
  
  router.get('/auth/google/callback', 
    passport.authenticate('google', { 
        failureRedirect: '/login-failure',
        successRedirect: '/dashboard', 
    }),
    
);

router.get('/login-failure', (req,res) =>{
    res.send("Something went wrong");
});

router.get('/logout', (req,res)=>{
    req.session.destroy(error=>{
        if(error){
            console.log(error);
            res.send('Error logging out');
        } else {
            res.redirect('/');
        }
    })
});

//Persist user data after successful authentication
passport.serializeUser( function(user,done){
    done(null,user.id);
})

//Retreive user data from session
passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
});

export default router;
