var playerData;

$(document).ready(function(){
    socket.on('whoIs', function(data){
        socket.emit('iAm', 'player');
    });

    var join = function() {
        socket.emit('join', {'fullname': $('#fullnameInput').val()});
        $('.screen').hide();
        $('#joiningScreen').show();
    }
    $('#joinButton').click(function(event) {
        join();
    });
    $('#fullnameInput').keypress(function(event) {
        if (event.which == 13) {
            event.preventDefault();
            join();
        }
    });

    socket.on('joined', function(player) {
        playerData = player;

        $('.screen').hide();
        $('#joinedScreen .player').html(player.fullname);
        $('#joinedScreen').show();
    });

    socket.on('clue', function(data) {
        $('.screen').hide();
        $('#clueScreen').show();
    });

    socket.on('response', function(data) {
        $('.screen').hide();
        $('#responseScreen').show();
    });

    $('#responseScreen .next').click(function(event) {
        socket.emit('respond', playerData);
        $('.screen').hide();
        $('#respondedScreen').show();
    });

    socket.on('respond', function(data) {
        $('.screen').hide();
        $('#judgementScreen').show();
    });

    $('.screen').hide();
    $('#joinScreen').show();
});

