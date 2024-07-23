const mongoose = require('mongoose');

module.exports = () => {
    const connect = () => {
        if (process.env.NODE_ENV !== 'production') {
            mongoose.set('debug', true);
        }
        mongoose.connect('mongodb://127.0.0.1:27017/admin', {
            dbName: 'db_lab_web',
        })
        .then(() => {
            console.log('Database connected');
        })
        .catch((error) => {
            console.log('CONNECTION ERROR', error);
        });
    };
    connect();

    mongoose.connection.on('error', (error) => {
        console.error('CONNECTION ERROR', error);
    });
    mongoose.connection.on('disconnected', () => {
        console.error('DISCONNECTED! RETRYING TO CONNECT.');
        connect();
    });
    require('./user');
    require('./post');
    require('./comment');
}