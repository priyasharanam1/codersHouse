require('dotenv').config();
const express = require('express');
const app = express();
const DbConnect = require('./database.js')
const router = require('./routes.js')

const PORT = process.env.PORT || 5500;
DbConnect();

app.use(express.json());
app.use(router);

app.get('/', (req,res) => {
    res.send('Hello from Express JS');
});

app.listen(PORT, ()=> console.log(`Listening on PORT ${PORT}`));