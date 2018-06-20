const express=require('express');
const mongoose=require('mongoose');
const cookieSession=require('cookie-session');
const passport=require('passport');
const keys=require('./config/key')
require('./services/passport');
mongoose.connect(keys.mongoURI);

const app=express();

app.use(
    cookieSession({
        maxAge:30*24*60*60*1000,
        keys:[keys.cookieKeys]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const port=process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`server running at ${port}`);
});



  