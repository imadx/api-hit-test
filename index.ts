import feathers from '@feathersjs/feathers';
import '@feathersjs/transport-commons';
import express from '@feathersjs/express';
import socketIO from '@feathersjs/socketio';

import EventDetailService from './services/EventDetailService'
import logger from './util/logger'

const PORT = process.env.PORT || 3030;

const app = express(feathers());

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/dist"));

app.configure(express.rest())
app.configure(socketIO());

app.use('/events', new EventDetailService())
app.use(express.errorHandler());

app.on('connection', connection =>
    app.channel('everybody').join(connection)
);

app.publish(data => app.channel('everybody'));

app.listen(PORT).on('listening', () =>
    logger.log(`Feathers server listening on http://0.0.0.0:${PORT}`)
);

app.service('events').create({
    data: {
        text: 'Hello world from the server'
    }
});
