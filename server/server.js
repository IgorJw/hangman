const app = require('express')

const http = require('http').createServer(app)
const io = require("socket.io")(http, {
    cors: {
       origin: "http://localhost:3000",
    },
  });

let subject = ''

io.on('connection', (socket) => {
    socket.on('setSubject', (sbj) => {
        subject = sbj
        io.sockets.emit('getSubject',subject)
    })
    socket.on('changeHiddenPassword',hiddenPassword => {
        socket.broadcast.emit('newHiddenPassword',hiddenPassword)
    })
    
})

http.listen(4001,function(){
    console.log('listening on port 4001')
})