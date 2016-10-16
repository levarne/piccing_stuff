$(function(){
    var randomGenerator = function(range) {
        return Math.floor(Math.random(range) * 10);
    }

    var $random_generator = $('#random_generator');
    var listnumbers = '<ul>'

    for (var i = 0; i < 7; i++) {
        listnumbers += '<li>' + randomGenerator(1) + '</li>';
    }

    listnumbers += '</ul>';
    $random_generator.html(listnumbers);
})