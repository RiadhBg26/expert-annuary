const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan')
const cors = require('cors');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const specialtyRouter = require('./routes/specialtyRoute');
const adminRouter = require('./routes/adminRoute');
const expertRouter = require('./routes/expertRoute');
const companyRouter = require('./routes/companyRoute');
const CompanySpecialtyRouter = require('./routes/companySpecialtyRoute');
const jobOfferRouter = require('./routes/jobOfferRoute');
const jobRequestRouter = require('./routes/jobRequestRoute');
const skillRouter = require('./routes/skillRoute');
const ChatRouter = require('./routes/ChatRoute')
const passport = require('./config/passport')
const expertProfileRoute = require('./routes/expertProfileRoute');

app.use(cors({
    origin:'*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: 'Content-Type, Authorization, Origin, X-Requested-With, Accept, jwt'
}));

mongoose.connect('mongodb://localhost/expert_db', { 
    useUnifiedTopology: true,  
    useNewUrlParser: true, 
    useCreateIndex: true,
    useFindAndModify: false
});
app.use(bodyParser.json(), bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());
app.use(passport.session());

//(Routes);
app.use('/api/admin', adminRouter);
app.use('/api/exprofile',  expertProfileRoute);
app.use('/api/experts',  expertRouter);
app.use('api/experts/login', expertRouter, passport.authenticate('jwt', { session : false }));
app.use('/api/company', companyRouter);
app.use('api/company/signin', companyRouter, passport.authenticate('jwt', { session : false }));
app.use('/api/specialty', specialtyRouter);
app.use('/api/companyspecialty', CompanySpecialtyRouter);
app.use('/api/joboffer', jobOfferRouter);
app.use('/api/jobrequest', jobRequestRouter);
app.use('/api/skill', skillRouter);
app.use('/api/chat', ChatRouter);



io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('message', (msg) => {
        console.log(msg);
        socket.broadcast.emit('message-broadcast', msg);
    });
    socket.on('join', function(data) {
        socket.join(data.user);
        console.log(data.user + 'wants to chat with you');
        socket.broadcast.to(data.user).emit('wants to chat with you', {user: data.user, message: `${data.user} is here`})
    })



});
server.listen(process.env.port || 3000, function() {
    console.log('listening to port 3000 ...');
})
const publicPath = path.join(__dirname, '/uploads');
// console.log(publicPath);
app.use(express.static(__dirname));
// console.log(app.use(express.static(dirPath)));


// "C:\Program Files\MongoDB\Server\4.2\bin\mongod.exe" --dbpath="c:\data\db"