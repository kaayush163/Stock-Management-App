const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static(path.join(__dirname,"./views")));
app.use(bodyParser.json());
app.use(cors());

//here add routes files
const candyRoutes = require('./routes/candy');
app.use('/candy',candyRoutes);

//add databse here
const sequelize = require('./util/database');


//here we will add model files


sequelize.sync()
.then(()=>{
    app.listen(3000);
})
.catch((err) => {
    console.log(err,"error coming out in app.js");
})

