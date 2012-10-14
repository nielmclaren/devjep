var playerData;

$(document).ready(function(){
    socket.on('whoIs', function(data){
        socket.emit('iAm', 'player');
    });

    /// DEBUG: Some default names to speed testing.
    var names = ['French Stewart', 'Turd Ferguson', 'Sean Connery', 'Pete', 'Jane', 'Harry', '$Texas'];
    $('#fullnameInput').val(names[Math.floor(Math.random() * names.length)]);

    $('#joinScreen').show();

    $('#joinButton').click(function(event) {
        socket.emit('join', {'fullname': $('#fullnameInput').val()});
        $('.screen').hide();
        $('#joiningScreen').show();
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
});

