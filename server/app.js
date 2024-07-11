const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 8080;
const connect = require('./schemas');

connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// 정적 파일 경로 설정
app.use('/images', express.static(path.join(__dirname, 'images')));

const userRouter = require('./routes/users');
const imageRouter = require('./routes/images');
const postRouter = require('./routes/posts');

app.use('/api/users', userRouter);
app.use('/api/images', imageRouter);
app.use('/api/posts', postRouter); 

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
