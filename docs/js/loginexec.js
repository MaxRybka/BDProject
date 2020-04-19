/*$("#loginbtn").click(function() {
    
    jQuery.ajax({
        type: "POST",
        url: "localhost:8888/prod",
        data: JSON.stringify({
            "login": login,
            "password": password
        }),
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function(data) {
            alert(data);
        },
        complete: function(data) {
            alert("complete")
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    })

    $("#username").val("");
    $("#pass").val("");
});*/


$(document).on('click', '#loginbtn', function() {
    //import $ from 'jquery';
    //window.jQuery = $;
    //window.$ = $;
    let log = $("#username").val();
    let pass = $("#pass").val();
    let datatosend = JSON.stringify({ login: log, password: pass });
    jQuery.ajax({
        type: "POST",
        url: "http://localhost:8888/login",
        data: datatosend,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data, textStatus) {
            console.log("success");
            if (data.redirect && (data.notify === undefined)) {
                // data.redirect contains the string URL to redirect to
                window.location.href = data.redirect;
            } else {
                alert(data.notify);
                window.location.href = data.redirect;
            }
        },
        failed: function(xhr) {
            alert("Incorrect username and/or password. Please, try again.");
        },
    });
    $("#username").val("");
    $("#pass").val("");
});