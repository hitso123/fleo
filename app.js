//============================
// IMPORTS
//============================


//NPM Imports
const express =require('express');
const app =express();
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const morgan = require('morgan')
const expressSession = require('express-session');



var config =require('./config');



//Route Imports
const companyRoutes=require('./routes/company')
const mainRoutes=require('./routes/main')

//Model Imports
const Rest =require('./models/rest');

//============================
//DEVLOPMENT
//============================
// Morgan
app.use(morgan('tiny'))

// Seed to DB

// const seed=require('./utils/seed');
// seed();

//============================
// CONFIG
//============================


	mongoose.connect(config.db.connection);

// Express Config
app.set("view engine","ejs");
app.use(express.static('public'));

// Body parser Config
app.use(bodyParser.urlencoded({extended: true}));



//Method Override Config
app.use(methodOverride('_method'));



// Route Config
app.use("/", mainRoutes);
app.use("/company",companyRoutes);

//============================
// LISTEN
//============================


app.listen(process.env.PORT || 3000,()=>{
	console.log("ORrestaurant is running....");
});