'use strict';

const Hapi = require('hapi');
const Good = require('good');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: '8001'
});

server.register(require('inert'), (err) => {
  if (err) {
    throw err;
  }

  server.route({
    method: 'GET',
    path: '/',
    handler: function(request, reply) {
      return reply.file('./public/index.html');
    }
  });
});

server.register({
  register: Good,
  options: {
    reporters: [{
      reporter: require('good-console'),
      events: {
        response: '*',
        log: '*'
      }
    }]
  }
}, (err) => {
  if (err) {
    throw err;
  }

  // Start the server
  server.start((err) => {
    if (err) {
      throw err;
    }
    console.log('Server running at: ', server.info.uri);
  });

});

