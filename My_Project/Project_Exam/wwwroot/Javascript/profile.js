var regexEmail = /^(?=.{10,30}$)[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
var regexPassword =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d@!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,20}$/;
var regexUsername = /^[a-z0-9_-]{2,10}$/;

$("#onEditProfileAdmin").click(function () {
    var isValidPassword = checkValidPassword();
    var isValidConfirmPassword = checkValidConfirmPassword();
    if (isValidConfirmPassword && isValidPassword) {
        var _user = new Object();
        _user.Id = $('#idUser').val().trim();
        _user.UserName = $('#userName').val().trim();
        _user.Email = $('#email').val();
        _user.Password = $('#password').val().trim();
        _user.ConfirmPassword = $('#confirmPassword').val().trim();
        _user.Name = $('#name').val();
        _user.CreateAt = $('#createAt').val().trim();
        _user.RoleId = $('#role').val().trim();
        $.ajax({
            type: "PUT",
            url: "/Admin/Admin/PutProfile",
            data: _user,
            success: function (data) {
                Toast.fire({
                    icon: 'success',
                    title: 'Update successfully',
                    timer: 1500,
                    confirmButtonText: 'Ok',
                    willClose: () => {
                        location.href = "/Admin/Admin/Profile/" + _user.Id;
                    }
                });
                //setTimeout(() => location.href = "/Admin/Admin/Profile/" + _user.Id, 2000)
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
        return true;
    }
    else {
        return false;
    }
});

$("#onEdit").click(function () {
    $(".password").css("display", "block");
    $(".saveEdit").css("display", "block");
    $("#onEdit").css("display", "none");
});
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
//Update user
$("#onEditProfile").click(function () {
    var isValidPassword = checkValidPassword();
    var isValidConfirmPassword = checkValidConfirmPassword();
    if (isValidConfirmPassword && isValidPassword) {
        var _user = new Object();
        _user.Id = $('#idUser').val().trim();
        _user.UserName = $('#userName').val().trim();
        _user.Email = $('#email').val();
        _user.Password = $('#password').val().trim();
        _user.ConfirmPassword = $('#confirmPassword').val().trim();
        _user.Name = $('#name').val();
        _user.CreateAt = $('#createAt').val().trim();
        _user.RoleId = $('#role').val().trim();
        $.ajax({
            type: "PUT",
            url: "/Home/PutProfile",
            data: _user,
            success: function (data) {
                Toast.fire({
                    icon: 'success',
                    title: 'Update successfully',
                    timer: 1500,
                    confirmButtonText: 'Ok'
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
        return true;
    }
    else {
        return false;
    }
});
//Update admin
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
function checkValidConfirmPassword() {
    var confirmPassword = $('#confirmPassword').val().trim();
    if (confirmPassword != "" && confirmPassword != null) {
        $('#confirmPassword').css('border-color', '#ccc');
        $('.invalid-feedback4').hide();
        if (!regexPassword.test(confirmPassword)) {
            $('#confirmPassword').css('border-color', 'red');
            $('.invalid-format-pass1').show();
            return false;
        } else {
            $('#confirmPassword').css('border-color', '#ccc');
            $('.invalid-format-pass1').hide();
            if (confirmPassword != $('#password').val().trim()) {
                $('#confirmPassword').css('border-color', 'red');
                $('.invalid-format-confirm-pass').show();
                return false;
            } else {
                $('#confirmPassword').css('border-color', '#ccc');
                $('.invalid-format-confirm-pass').hide();
            }
            return true;
        }
    } else {
        $('#confirmPassword').css('border-color', 'red');
        $('.invalid-feedback4').show();
        return false;
    }
};
$(document).ready(function () {
    //password
    $(document).on('focusin', '#password', function () {
        $('#password').css('border-color', '#ccc');
        $('.invalid-feedback3').hide();
    });
    $(document).on('focusout', '#password', function () {
        checkValidPassword();
    });
    //ConfirmPassword
    $(document).on('focusin', '#confirmPassword', function () {
        $('#confirmPassword').css('border-color', '#ccc');
        $('.invalid-feedback4').hide();
    });
    $(document).on('focusout', '#confirmPassword', function () {
        checkValidConfirmPassword();
    });
});
