var socket = io.connect('http://192.168.1.100');

$(document).ready(function(){
	socket.on('whoIs', function(data){
		socket.emit('iAm', 'screen');
	});

    socket.on('playerList', function(players) {
        $.each(players, function(i, player) {
            $('#playerList').append('<li id="' + player.id + '">' + player.fullname + '</li>');
        });
    });

    socket.on('playerJoin', function(player) {
        $('#playerList').append('<li id="' + player.id + '">' + player.fullname + '</li>');
    });

	socket.on('playerLeave', function(player){
        $('#playerList #' + player.id).remove();
	});
});
