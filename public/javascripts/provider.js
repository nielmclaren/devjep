var socket = io.connect('http://108.166.124.108');
var mouseMove = false;
var mousePressed = false;
var clientId = 0;

$(document).ready(function(){
//$.mobile.touchOverflowEnabled = true;

setTimeout(function(){
	window.scrollTo(0, 1);
	}, 0);

socket.on('whoIs', function(data){
	socket.emit('Iam', 'provider');
})

socket.on('mouseMover', function(data){
	mouseMove = true;
	clientId = data - 2;
	console.log(clientId);
})

$('#mouseTarget').mousedown(function(){
	mousePressed = true;
	$('#mouseTarget').css("left", e.pageX);
	$('#mouseTarget').css("top", e.pageY); 
}).mouseup(function(){
	mousePressed = false;
});

var obj = document.getElementById('mouseTarget');
obj.addEventListener('touchmove', function(event) {
	//prevent scrolling
	event.preventDefault();
	 	window.scrollTo(0, 1);
	 	// If there's exactly one finger inside this element
		if (event.targetTouches.length == 1) {
		var touch = event.targetTouches[0];
		// Place element where the finger is
		obj.style.left = touch.pageX - 200 + 'px';
			obj.style.top = touch.pageY - 200 + 'px';
			mousePressed = true;
			var touchData = {"clientId":clientId, "xPos": touch.pageX, "yPos": touch.pageY, "movement":mousePressed}
			socket.emit('mousePosition', touchData);
		}
}, true);

$(document).mousemove(function(e){
	if (mouseMove && mousePressed){
		$('#mouseTarget').css("left", e.pageX - 100)
		$('#mouseTarget').css("top", e.pageY - 100) 
		var xPos = e.pageX;
		var yPos = e.pageY;
		var dataAr = {"clientId": clientId, "xPos": xPos, "yPos":yPos, "movement":mousePressed};
		socket.emit('mousePosition', dataAr);
	 	}
	 });
});