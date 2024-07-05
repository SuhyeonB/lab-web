const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
<<<<<<< HEAD
require('dotenv').config();
=======
>>>>>>> 7985335e697b69230d6f4ea8acfb00a3ff5802f6
const port = process.env.PORT || 8080;
const connect = require('./schemas');

connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
/* app.use(cors({
    exposedHeaders:['Authorization'],
})); */

app.use('/images', express.static('images'));

const userRouter = require('./routes/users');

app.use('/api/users', userRouter);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});