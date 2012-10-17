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

    var linkUrl = appUrl + '/player';
    var qr = qrcode(4, 'M');
	qr.addData(linkUrl);
	qr.make();
	$('#qrContainer').html(qr.createImgTag(12, 8));

    $.getJSON('http://api.bit.ly/shorten?version=2.0.1&longUrl=' + linkUrl + '&login=danielgm&apiKey=R_c75d139022dfe72f21f69bbbeedb45b5&history=0&format=json&callback=?', function(data) {
        $('#bitlyContainer').html('<p>' + data.results[linkUrl].shortUrl + '</p>');
    });

    $('#joinScreen').show();
});
