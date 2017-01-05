var io = io.connect('/');

// (1) Send a ping event to server 
console.log("socket: browser says hello (1)");
io.emit('hello', { some: 'data' });

// (4) Browser receives pong event
io.on('world', function(data) {
	console.log("socket: browser receives world (4)", data);
});
