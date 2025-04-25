const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();

//*Create Server Express*/
const app = express();

//*Database Connection*/
dbConnection();

//*Cors Configuration*/
app.use(cors());


const port = process.env.PORT || 3005;

app.use(express.static('public'));
app.use(express.json());

//*Routes*/
app.use('/api/auth', require('./routes/auth'));


app.listen(port, () => {
    console.log(`Server is running at Port: ${port}`);
});