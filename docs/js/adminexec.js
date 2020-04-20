function loadData() {
    getData();
    configureAddForm();
}

function getData() {
    let url = "/users";
    //alert('Get data');
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function() {
        if (this.status === 200) {
            //alert(xhr.response);
            if (JSON.parse(this.response).redirect !== undefined) {
                window.location.href = JSON.parse(this.response.redirect);
            } else {
                treatTable(this.response);
            }
        } else {
            alert(xhr.response);
        }
    };
    xhr.onerror = function() {
        alert("Network Error");
    };
    xhr.send();
}

function treatTable(data) {
    dataObj = JSON.parse(data);
    let elem = document.getElementById("users");
    let inner = '<tr class="thead-dark">' +
        '<th>Login</th>' +
        '<th>Role</th>' +
        '<th></th>' +
        '</tr>';
    if (dataObj.length == 0) {
        alert("There aren't any users in the system, except admin");
    }
    for (let user of dataObj) {
        inner += '<tr class="table-row"><td>' +
            user.login +
            '</td><td>' +
            user.role +
            '</td><td>' +
            '<button class="btn btn-danger" onclick="sendDelete(this.id)" id=' + user.login + '>Delete</button>' +
            '</td></tr>';
    }
    elem.innerHTML = inner;
}

function sendDelete(log) {
    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", ("/user/" + log), true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.onreadystatechange = function() { //Вызывает функцию при смене состояния.
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            if (JSON.parse(this.response).redirect !== undefined) {
                window.location.href = JSON.parse(this.response).redirect;
            } else {
                getData();
            }
        } else if (xhr.status !== 200) {
            alert(xhr.response);
            //alert("Something went wrong while deleting " + log + ".");
        }
    };
    xhr.send();
}

function clearForm(name) {
    let form = document.forms[name];
    form.reset();
}

function configureAddForm() {
    document.getElementById("add-button").addEventListener("click", function(e) {
        e.preventDefault();
        // получаем данные формы
        let addUserForm = document.forms["addForm"];
        let log = addUserForm.elements["login"].value;
        let pass = addUserForm.elements["pass"].value;
        let data = JSON.stringify({ login: log, password: pass });
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "/user", true);
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                if (JSON.parse(xhr.response).redirect !== undefined) {
                    window.location.href = JSON.parse(this.response).redirect;
                } else {
                    clearForm('addForm');
                    getData();
                }
            } else if (xhr.status !== 200) {
                alert('You have duplicated login, we didn\'t insert anything into db.\nTry again');
            }
        };
        xhr.send(data);
    });
}