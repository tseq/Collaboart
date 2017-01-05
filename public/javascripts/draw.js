// Temporary enlargement of canvas. Will fix it using CSS later.
(function init() {
	var canvas = document.getElementById("draw");
	canvas.width = document.body.clientWidth;
	canvas.height = document.body.clientHeight;
})();

paper.install(window);
window.onload = function() {
	// Set up the canvas
	paper.setup('draw');

	function randomColor() {
		return {
			red: 0,
			green: Math.random(),
			blue: Math.random(),
			alpha: ( Math.random() * 0.25 ) + 0.05
		};
	}

	function drawCircle(x, y, radius, color) {
	    // Render the circle with Paper.js
	    var circle = new Path.Circle(new Point(x, y), radius);
	    circle.fillColor = new Color(color.red, color.green, color.blue, color.alpha);
	    // Refresh the view, so we always get an update, even if the tab is not in focus
	    view.draw();
	} 

	function emitCircle( x, y, radius, color ) {
	    // We'll do something interesting with this shortly...
	}

	// Create a simple drawing tool:
	var tool = new Tool();
	var path;

	// Define a mousedown and mousedrag handler
	tool.onMouseDown = function(event) {
		path = new Path();
		path.strokeColor = 'black';
	}

	tool.onMouseDrag = function(event) {
	    // Take the click/touch position as the centre of our circle
	    var x = event.middlePoint.x;
	    var y = event.middlePoint.y;
	    // The faster the movement, the bigger the circle
	    var radius = event.delta.length / 2;
	    // Generate our random color
	    var color = randomColor();
	    // Draw the circle 
	    drawCircle( x, y, radius, color );
	    // Pass the data for this circle
	    // to a special function for later
	    emitCircle( x, y, radius, color );
    }

	tool.onMouseUp = function(event) {

	}
}