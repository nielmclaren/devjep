var responsePlayer;

$(document).ready(function(){
	socket.on('whoIs', function(data){
		socket.emit('iAm', 'trebek');
	});

    $('#joinScreen .nextButton').click(function(event) {
        $('#joinScreen').hide();
        $('#clueScreen').show();

        socket.emit('clue');
    });

    $('#clueScreen .nextButton').click(function(event) {
        $('#clueScreen').hide();
        $('#responseScreen').show();

        socket.emit('response');
    });

    socket.on('respond', function(player) {
        responsePlayer = player;

        $('#judgementScreen .player').html(
            responsePlayer ? responsePlayer.fullname : 'Oops!');

        $('#responseScreen').hide();
        $('#judgementScreen').show();
    });

    $('#judgementScreen .prevButton').click(function(event) {
        isAwaitingResponse = true;

        $('#judgementScreen').hide();
        $('#responseScreen').show();

        socket.emit('response');
    });

    $('#judgementScreen .nextButton').click(function(event) {
        $('#judgementScreen').hide();
        $('#clueScreen').show();

        socket.emit('clue');
    });

    $('.screen').hide();
    $('#joinScreen').show();
});
