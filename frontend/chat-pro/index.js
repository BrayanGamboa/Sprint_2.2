const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const app = express();

//Libraries WebSocket
const { createServer } = require("http");
const { Server } = require("socket.io");

require('dotenv').config();

//Middewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'static')));

app.get('', (req,res) => {
    res.sendFile(path.join(__dirname,"static/html/registration.html"))
    
})

//variables
app.set('PORT', process.env.PORT || 4050);

const httpServer = createServer(app);
const io = new Server(httpServer);




io.on('connection', (socket) => {
    console.log('Client connected...',socket.id);
});

httpServer.listen(app.get('PORT'), () => {
    console.log(`Server on port ${app.get('PORT')}`);
});    


