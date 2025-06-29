import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import connectDB from './server/config/db.js';
import methodOverride from 'method-override';

//Intialize middleware to authenicate and store session data
import session from 'express-session';
import passport from 'passport';
//creates a MongoDB session that express-session can store data in
import MongoStore from 'connect-mongo';

import authRoutes from './server/routes/auth.js';
import indexRoutes from './server/routes/index.js';
import dashboardRoutes from './server/routes/dashboard.js';

const app=express();
const port = 5000 || process.env.PORT;

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
    cookie: { maxAge: new Date (Date.now() + (1*60*60*1000))} //1 minute
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride("_method"));

app.use(express.static('public'));

//Connect to Database
connectDB();

//Templating Engine expressLayouts is a middleware
app.use(expressLayouts);
//sets the default layout to mains.ejs in views directory
app.set('layout', 'layouts/main');
//sets view engine to ejs and enables to render .ejs file
app.set('view engine', 'ejs');

//Routes ---> middlewares
//The order of middlewares matters
app.use('/', authRoutes);
app.use('/', indexRoutes);
app.use('/', dashboardRoutes);


//Handle 404
app.get('*', (req,res)=>{
    res.status(404).render('404');
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});
