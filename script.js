var URL = 'http://kashka.zz.mu/notachat/wp-here/';
var NICKNAME = 'admin1';
var COUNT_MESSAGES_GET = 25;

$(document).on('ready', function() {
    getCharFeed();
    getActiveUsers();
    setInterval(getActiveUsers, 10000);
    setInterval(getCharFeed, 1000);
});

function getActiveUsers() {
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
            var table = document.getElementById('users_table');
            while (table.childNodes[0]) {
                table.removeChild(table.childNodes[0]);
            }
            var tr = document.createElement('tr');
            tr.className = 'alt-color';
            var td = tr.insertCell(-1);
            td.innerHTML = 'online';
            table.appendChild(tr);
            for (var i = rdata.length - 1; i >= 0; i--) {
                var tr = document.createElement('tr');
                var tdUsername = tr.insertCell(-1);
                tdUsername.innerHTML = '<div>' + rdata[i]['user'] + '</div>';
                table.appendChild(tr);
            }
        },
        error: function(e, status, msg) {
            console.log('AJAX ERROR: get_active_users', e, status, msg);
        }
    });
}

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ', ' + hour + ':' + min + ':' + sec ;
    return time;
}

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
            var table = document.getElementById('msg_table');
            while (table.childNodes[0]) {
                table.removeChild(table.childNodes[0]);
            }
            for (var i = rdata.length - 1; i >= 0; i--) {
                var tr = document.createElement('tr');
                if (i % 2) {
                    tr.className = 'alt-color';
                }
                var tdUsername = tr.insertCell(-1);
                var tdMsg = tr.insertCell(-1);
                var tdTime = tr.insertCell(-1);

                tdUsername.innerHTML = '<div>' + rdata[i]['username'] + '</div>';
                tdMsg.innerHTML = '<div>' + rdata[i]['msg'] + '</div>';
                tdTime.innerHTML = '<div>' + timeConverter(rdata[i]['time']) + '</div>';

                table.appendChild(tr);
            }
        },
        error: function(e, status, msg) {
            console.log('AJAX ERROR: get_chat_feed', e, status, msg);
        }
    });
}

function send() {
    var data = {
        'act': 'post_message',
        'author': NICKNAME,
        'message': $('#msg_editable').val()
    };
    $.ajax({
        type: 'POST',
        url: URL,
        data: data,
        dataType: 'html',
        success: function(text) {
            var textarea = document.getElementById('msg_editable');
            textarea.value = '';
            getCharFeed();
        },
        error: function(e, status, msg) {
            console.log('AJAX ERROR: post_message', e, status, msg);
        }        
    });
}
