const mongoose = require('mongoose');

const dbURI = 'mongodb+srv://readonly:readonly@covid-19.hip2i.mongodb.net/covid19';
mongoose.connect(dbURI, { useUnifiedTopology: true,  useNewUrlParser: true });

// CONNECTION EVENTS
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', (err) => {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close( () => {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};

// BRING IN YOUR SCHEMAS & MODELS
require('./Model');