var socket = io.connect('http://192.168.1.100');

$(document).ready(function() {
    size();
});
$(window).resize(function() {
    size();
});

function size() {
    $('.screen').height($('body').height() - 40);
}
