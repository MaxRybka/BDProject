function setHandler() {
    $("#loginbtn").click(function() {
        let login = $("#username").val();
        let password = $("#pass").val();
        console.log(login);
        //xhr
        alert(login);
        alert(password);

        $("#username").val() = "";
        $("#loginbtn").val() = "";
    });

}