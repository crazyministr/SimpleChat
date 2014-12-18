var URL = 'http://kashka.zz.mu/notachat/wp-here/';
var NICKNAME = 'Czar';
var COUNT_MESSAGES_GET = 10;

$(document).on('ready', function() {
    var data = {
        'act': 'get_active_users',
        'format': 'json'
    };
    $.ajax({
        type: 'GET',
        url: URL,
        data: data,
        dataType: 'json',
        success: function(rdata) {
            console.log(rdata);
        },
        error: function(e, status, msg) {
            console.log('AJAX ERROR: get_active_users', e, status, msg);
        }
    });
});

function getCharFeed() {
    var data = {
        'act': 'get_chat_feed',
        'format': 'json',
        'user': NICKNAME,
        'count': COUNT_MESSAGES_GET
    }
    $.ajax({
        type: 'GET',
        url: URL,
        data: data,
        dataType: 'json',
        success: function(rdata) {
            console.log(rdata);
        },
        error: function(e, status, msg) {
            console.log('AJAX ERROR: get_chat_feed', e, status, msg);
        }
    });
}

function send() {
    var data = {
        'act': 'post_msg',
        'author': NICKNAME,
        'msg': $('#im_editable').val()
    };
    console.log(data);
    $.ajax({
        type: 'POST',
        url: URL,
        data: data,
        dataType: 'json',
        success: function(text) {
            console.log('message sent.');
        },
        error: function(e, status, msg) {
            console.log('AJAX ERROR: post_msg', e, status, msg);
        }        
    });
}
