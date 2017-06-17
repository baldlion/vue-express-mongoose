export default function (io) {
  io.on('connection', socket => {
    console.log('client connected')

    socket.on('asdf', msg => {
      console.log(msg)
    })
  })

}