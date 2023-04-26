import socketio from 'socket.io';
import { server } from '../../../server.config.js';

const ioHandler = (req, res) => {
    if (!res.socket.server.io) {
        const io = socketio(server);
        io.on('connection', (socket) => {
            console.log('a user connected');

            socket.on('countUpdate', (count) => {
                console.log(`countUpdate event received with count: ${count}`);
                io.emit('countUpdate', count);
            });

            socket.on('incrementCount', () => {
                console.log('incrementCount event received');
                io.emit('countUpdate', ++count);
            });

            socket.on('decrementCount', () => {
                console.log('decrementCount event received');
                io.emit('countUpdate', --count);
            });

            socket.on('disconnect', () => {
                console.log('user disconnected');
            });
        });

        res.socket.server.io = io;
    }

    res.end();
};

export default ioHandler;
