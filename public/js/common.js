var socket = io.connect('http://devjep.jit.su');

$(document).ready(function() {
    size();
});
$(window).resize(function() {
    size();
});

function size() {
    $('.screen').height($('body').height() - 40);
}
