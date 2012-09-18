var socket = io.connect('http://108.166.124.108');
mouseIsPressed = false;
createAttractor = false;
removeAttractor = false;
clientId = 0;
disconnectId = 0;
xPosition = Math.ceil(100*Math.random());
yPosition = Math.ceil(100*Math.random());

$(document).ready(function(){
	socket.on('whoIs', function(data){
		socket.emit('Iam', 'target');
	})

	socket.on('target', function(data){
		function getProcessingSketchID () { return 'gravitational_swarm_multi_client'}
		//function getProcessingSketchID () { return 'optimized_gravitational_swarm'}
		var canvasRef = document.createElement('canvas');
		var p = Processing.loadSketchFromSources(canvasRef, ['gravitational_swarm_multi_client.pde']);
		//var p = Processing.loadSketchFromSources(canvasRef, ['optimized_gravitational_swarm.pde']);
		$('#content').append(canvasRef);
		$('#content, #gravitation, #lines').fadeIn();	
	});

	socket.on('values', function(data){
		mouseIsPressed = data.movement;
		xPosition = data.xPos;
		yPosition = data.yPos; 
		clientId = data.clientId;
		console.log(data.clientId);
	})

	socket.on('createAttractor', function(data){
		createAttractor = true;
	});

	socket.on('disconnectClient', function(data){
		removeAttractor = true;
		disconnectId = data;
		console.log("disconnecting from " + data);
	});

	socket.on('targetExists', function(data){
		//$('#content').remove();
		$('#content').append('<p id="error_notification">target client already exists</p>');
		console.log("appending error notification");
	});
});