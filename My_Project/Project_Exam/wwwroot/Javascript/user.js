var regexEmail = /^(?=.{10,30}$)[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
var regexPassword =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d@!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,20}$/;
var regexUsername = /^[A-Za-z0-9_-]{2,10}$/;

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
});
$('.onDeleteUser').click(function () {
    var _id = $(this).attr('data-id');
    Swal.fire({
        title: 'Do you want to delete this user?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Delete',
        denyButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "/Admin/Users/Delete/" + _id,
                method: "POST",
                contentType: "application/json",
                success: function () {
                    Toast.fire({
                        icon: 'success',
                        title: 'Delete successfully',
                        timer: 1200,
                        willClose: () => {
                            location.href = "/Admin/Users/Index";
                        }
                    });
                },
                error: function () {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error...',
                        text: 'Delete fail!',
                        footer: '<a href="">Why do I have this issue?</a>'
                    });
                }
            });
        }
    });
});


function checkValidName() {
    var name = $('#name').val().trim();
    if (name != '' && name != null) {
        $('#name').css('border-color', '#ccc');
        $('.invalid-feedback').css('display', 'none');
        return true;
    } else {
        $('#name').css('border-color', 'red');
        $('.invalid-feedback').css('display', 'block');
        return false;
    }
};
function checkValidUserName() {
    var username = $('#userName').val().trim();
    if (username != "" && username != null) {
        $('#userName').css('border-color', '#ccc');
        $('.invalid-username').css('display', 'none');
        if (!regexUsername.test(username)) {
            $('#userName').css('border-color', 'red');
            $('#invalid-format').css('display', 'block');
        }
        else {
            $('#userName').css('border-color', '#ccc');
            $('#invalid-format').css('display', 'none');
        }
        return true;
    } else {
        $('#userName').css('border-color', 'red');
        $('.invalid-username').css('display', 'block');
        return false;
    }
};
function checkValidEmail() {
    var email = $('#email').val().trim();
    if (email != "" && email != null) {
        $('#email').css('border-color', '#ccc');
        $('.invalid-feedback2').hide();
        if (!regexEmail.test(email)) {
            $('#email').css('border-color', 'red');
            $('.invalid-format').css('display', 'block');
            return false;
        } else {
            $('#email').css('border-color', '#ccc');
            $('.invalid-format').hide();
            return true;
        }
    } else {
        $('#email').css('border-color', 'red');
        $('.invalid-feedback2').show();
        return false;
    };
};
function checkValidPassword() {
    var password = $('#password').val().trim();
    if (password != "" && password != null) {
        $('#password').css('border-color', '#ccc');
        $('.invalid-feedback3').hide();
        if (!regexPassword.test(password)) {
            $('#password').css('border-color', 'red');
            $('.invalid-format-pass').show();
            return false;
        } else {
            $('#password').css('border-color', '#ccc');
            $('.invalid-format-pass').hide();
            return true;
        }
    } else {
        $('#password').css('border-color', 'red');
        $('.invalid-feedback3').show();
        return false;
    }
};
$(document).ready(function () {
    //name
    $(document).on('focusin', '#name', function () {
        $('#name').css('border-color', '#ccc');
        $('.invalid-feedback').hide();
    });
    $(document).on('focusout', '#name', function () {
        checkValidName();
    });
    //username
    $(document).on('focusin', '#userName', function () {
        $('#userName').css('border-color', '#ccc');
        $('.invalid-username').hide();
    });
    $(document).on('focusout', '#userName', function () {
        checkValidUserName();
    });
    //email
    $(document).on('focusin', '#email', function () {
        $('#email').css('border-color', '#ccc');
        $('.invalid-feedback2').hide();
    });
    $(document).on('focusout', '#email', function () {
        checkValidEmail();
    });
    //password
    $(document).on('focusin', '#password', function () {
        $('#password').css('border-color', '#ccc');
        $('.invalid-feedback3').hide();
    });
    $(document).on('focusout', '#password', function () {
        checkValidPassword();
    });
});

var flag = true;
var flagUpdate = true;
function CheckExistsUserName() {
    var id = $('#userName').val().trim();
    $.ajax({
        method: "GET",
        url: "/Admin/Users/CheckExistsUserName/" + id ,
        type: "json",
        success: function (data) {
            let message = document.querySelector('#existsUserName');
            if (data) {
                message.innerText = "";
                $('#userName').css('border-color', '#ccc');
                flag = true;
                return true;
            } else {
                message.innerText = "Username already exists!";
                $('#userName').css('border-color', 'red');
                flag = false;
                return false;
            }
        }, error: function (err) {
            Toast.fire({
                icon: 'error',
                title: 'Create Fail!',
                timer: 1200,
                confirmButtonText: 'Ok'
            });
        }
    });
}
function CheckExistsPutUserName(id) {
    debugger 
    var name = $('#userName').val().trim();
    $.ajax({
        method: "GET",
        url: "/Admin/Users/CheckExistsPutUserName?id=" + id + "&name=" + name,
        type: "json",
        success: function (data) {
            let message = document.querySelector('#existsUserName');
            if (data == true) {
                message.innerText = "";
                $('#userName').css('border-color', '#ccc');
                flagUpdate = true;
                return true;
            } else {
                message.innerText = "Username already exists!";
                $('#userName').css('border-color', 'red');
                flagUpdate = false;
                return false;
            }
        }, error: function (err) {
            Toast.fire({
                icon: 'error',
                title: 'Create Fail!',
                timer: 1200,
                confirmButtonText: 'Ok'
            });
        }
    });
}
function CheckExistsEmail() {
    var id = $('#email').val().trim();
    $.ajax({
        method: "GET",
        url: "/Admin/Users/CheckExistsEmail/" + id,
        type: "json",
        success: function (data) {
            var message = document.querySelector('#existsEmail');
            if (data) {
                message.innerText = "";
                $('#email').css('border-color', '#ccc');
                flag = true;
                return true;
            } else {
                message.innerText = "Email already exists!";
                $('#email').css('border-color', 'red');
                flag = false;
                return false;
            }
        }, error: function () {
            Toast.fire({
                icon: 'error',
                title: 'Create Fail!',
                timer: 1200,
                confirmButtonText: 'Ok'
            });
        }
    });
}
function CheckExistsPutEmail(id) {
    var email = $('#email').val().trim();
    $.ajax({
        method: "GET",
        url: "/Admin/Users/CheckExistsPutEmail?id=" + id + "&email=" + email,
        type: "json",
        success: function (data) {
            var message = document.querySelector('#existsEmail');
            if (data) {
                message.innerText = "";
                $('#email').css('border-color', '#ccc');
                flagUpdate = true;
                return true;
            } else {
                message.innerText = "Email already exists!";
                $('#email').css('border-color', 'red');
                flagUpdate = false;
                return false;
            }
        }, error: function () {
            Toast.fire({
                icon: 'error',
                title: 'Create Fail!',
                timer: 1200,
                confirmButtonText: 'Ok'
            });
        }
    });
}
//Add
$("#onAdd").click(function () {
    var isValidName = checkValidName();
    var isValidUserName = checkValidUserName();
    var isValidEmail = checkValidEmail();
    var isValidPassword = checkValidPassword();
    if (isValidName && isValidUserName && isValidEmail && isValidPassword) {
        var _user = new Object();
        _user.Name = $('#name').val().trim();
        _user.UserName = $('#userName').val().trim();
        _user.Email = $('#email').val().trim();
        _user.Password = $('#password').val().trim();
        _user.Gender = parseInt($('#gender').val().trim());
        _user.RoleId = parseInt($('#role').val().trim());
        if (flag) {
            $.ajax({
                type: "POST",
                url: "/Admin/Users/Post",
                data: _user,
                success: function (data) {
                    Toast.fire({
                        icon: 'success',
                        title: 'Create new user successfully',
                        timer: 1200,
                        confirmButtonText: 'Ok',
                        willClose: () => {
                            location.href = "/Admin/Users/Index";
                        }
                    });

                }, error: function () {
                    Toast.fire({
                        icon: 'error',
                        title: 'Create Fail!',
                        timer: 1200,
                        confirmButtonText: 'Ok'
                    });
                }
            });
        }
    }
});
//Update
$("#onEditUser").click(function () {
    var isValidUserName = checkValidUserName();
    var isValidEmail = checkValidEmail();
    var isValidPassword = checkValidPassword();
    if (isValidUserName && isValidEmail && isValidPassword) {
        var _user = new Object();
        _user.Id = $('#idUser').val().trim();
        _user.UserName = $('#userName').val().trim();
        _user.Email = $('#email').val();
        _user.Password = $('#password').val().trim();
        _user.Name = $('#name').val();
        _user.CreateAt = $('#createAt').val().trim();
        _user.RoleId = $('#role').val().trim();
        if (flagUpdate) {
            $.ajax({
                type: "PUT",
                url: "/Admin/Users/Put",
                data: _user,
                success: function (data) {
                    Toast.fire({
                        icon: 'success',
                        title: 'Update successfully',
                        timer: 1200,
                        confirmButtonText: 'Ok',
                        willClose: () => {
                            location.href = "/Admin/Users/Index";
                        }
                    });
                },
                error: function () {
                    Toast.fire({
                        icon: 'error',
                        title: 'Error...',
                        text: 'Update Fail!',
                        footer: '<a href="">Why do I have this issue?</a>'
                    });
                }
            });
        }
    }
});