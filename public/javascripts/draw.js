paper.install(window);
window.onload = function() {
	// Set up paper
	paper.setup('draw');

	// Create a simple drawing tool:
	var tool = new Tool();
	var path;

	tool.onMouseDown = function(event) {
		path = new Path();
		path.strokeColor = 'black';
	}

	tool.onMouseDrag = function(event) {
	    // Take the click/touch position as the centre of our circle
	    var x = event.middlePoint.x;
	    var y = event.middlePoint.y;
	    // Compute radius based on speed of mouse movement
	    var radius = event.delta.length / 2;
	    var color = randomColor();
	    drawCircle(x, y, radius, color);
	    // Emit data to server
	    emitCircle(x, y, radius, color);
	}

	function randomColor() {
		return {
			red: Math.random(),
			green: Math.random(),
			blue: Math.random(),
			alpha: ( Math.random() * 0.25 ) + 0.05
		};
	}

	function drawCircle(x, y, radius, color) {
		var circle = new Path.Circle(new Point(x, y), radius);
		circle.fillColor = new Color(color.red, color.green, color.blue, color.alpha);
		view.draw();
	} 

	function emitCircle(x, y, radius, color) {
		// Get sessionId for IO connection
		var sessionId = io.io.engine.id;

    	// Circle's draw data
    	var data = {
    		x: x,
    		y: y,
    		radius: radius,
    		color: color
    	};

    	// Emit event with data and sessionId to the server
    	io.emit('drawCircle', data, sessionId)
    }

	// Listen for 'drawCircle' events created by other users
	io.on( 'drawCircle', function( data ) {
		drawCircle( data.x, data.y, data.radius, data.color );

	});
}