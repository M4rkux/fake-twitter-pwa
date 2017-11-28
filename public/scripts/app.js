$(document).ready(function () {
    $.ajax({
        url: '/list-messages.json',
        headers: [
            {'Access-Control-Allow-Origin': '*'}
        ]
    })
    .then(function (result) {
        result.map(function (item) {
            $('<article></article>').html(item.message).appendTo($('main'));
        });
        $('.loader').hide();
    })
    .fail(function () {
        $('.loader').hide();
    });
});