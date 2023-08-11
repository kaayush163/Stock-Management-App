const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

app.use(express.static(path.join(__dirname,"./views")));
app.use(bodyParser.json());
app.use(cors());

//here add routes files
const userRouter = require('./routes/signup');
const candyRoutes = require('./routes/candy');
app.use('/users',userRouter);
app.use('/candy',candyRoutes);

//add databse here
const sequelize = require('./util/database');

const User=require('./models/signup');
const Candy=require('./models/candy')

User.hasMany(Candy);
Candy.belongsTo(User);


sequelize.sync()
.then(()=>{
    app.listen(3000);
})
.catch((err) => {
    console.log(err,"error coming out in app.js");
})

