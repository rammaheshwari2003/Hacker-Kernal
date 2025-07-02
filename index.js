const express=require("express");
const app=express();
const hbs = require('hbs');
const bodyparser=require("body-parser");
const UserRoute=require("./route/UserRoute");
const sequelize=require("./config/Database");
const path = require('path');


app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

sequelize.sync().then(() => {
        console.log('Database synced successfully');
    }).catch((error) => {
        console.error('Error syncing database:', error);
    });

app.set('view engine', 'hbs')
app.use("/user", UserRoute);
app.use(express.static(path.join(__dirname, 'public')));


app.listen(8000,()=>{
    console.log("Server run on 8000 port");
})