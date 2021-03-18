const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// BODY PARSER
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


// MODELS
require('./Models/healthWorkers');
require('./Models/patients');
require('./Models/doctors');
require('./Models/hospitals');
require('./Models/dispensaries');
require('./Models/admin');

//MIDDLEWARES
const verify = require('./MiddleWares/verify');

// ROUTES IMPORTS
const authRoutes = require('./Routes/authRoutes');
app.use(authRoutes);

const doctorRoutes = require('./Routes/doctorRoutes');
app.use(doctorRoutes);

const healthWorkerRoutes = require('./Routes/healthWorkerRoutes');
app.use(healthWorkerRoutes);

const patientRoutes = require('./Routes/patientRoutes');
app.use(patientRoutes);

const hospitalRoutes = require('./Routes/hospitalRoutes');
app.use(hospitalRoutes);

const dispensaryRoutes = require('./Routes/dispensaryRoutes');
app.use(dispensaryRoutes);

const adminRoutes = require('./Routes/adminRoutes');
app.use(adminRoutes);




const { mongoUrl } = require('./keys');

const PORT = 3000;

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

mongoose.connection.on('connected', () => {
    console.log('Database Connected');
});

mongoose.connection.on('error', (err) => {
    console.log('Database Connection Error', err.message);
});


app.get('/', verify('healthWorker'), (req, res) => {
    res.send('ALHAMDULILLAH' + " " + req.user.userName);
});

app.listen(PORT, () => {
    console.log('Server Connected');
});
