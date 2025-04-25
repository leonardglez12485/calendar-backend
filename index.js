const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3005;

app.use(express.static('public'));
app.use(express.json());

//*Routes
app.use('/api/auth', require('./routes/auth'));


app.listen(port, () => {
    console.log(`Server is running at Port: ${port}`);
});