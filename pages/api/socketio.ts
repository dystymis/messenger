import { Server } from 'socket.io'
import { NextApiRequest } from 'next'
import { NextApiResponseServerIO } from '@/types/next'

export default function SocketHandler(req: NextApiRequest, res: NextApiResponseServerIO) {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on('connection', socket => {
      socket.on('send-message', msg => {
        io.emit('new-message', msg)
      })

      socket.on('user-typing', ({ username, isTyping }) => {
        socket.broadcast.emit('user-typing', { username, isTyping })
      })
    })
  }
  res.end()
}