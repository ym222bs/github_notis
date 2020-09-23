module.exports.startSocket = function (req, io) {
    io.sockets.on('connection', (socket) => {
        console.log(socket.id)
    })
}
