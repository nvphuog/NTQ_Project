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
var flag = true;
function CheckExistsUserName() {
    var id = $('#userName').val().trim();
    $.ajax({
        method: "GET",
        url: "/Admin/Users/CheckExistsUserName/" + id,
        type: "json",
        success: function (data) {
            let message = document.querySelector('#existsUserName');
            if (data) {
                message.innerText = "";
                $('#userName').css('border-color', '#ccc');
                flag = true;
                return true;
            } else {
                message.innerText = "Name already exists!";
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
$("#onAddUser").click(function () {
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
        _user.RoleId = $('#roleId').val().trim();
        if (flag) {
			$.ajax({
                type: "POST",
                url: "/Home/Register",
                data: _user,
                success: function (data) {
                    Toast.fire({
                        icon: 'success',
                        title: 'Create new account successfully',
                        timer: 1500,
                        confirmButtonText: 'Ok',
                        willClose: () => {
                            location.href = "/Home/Login";
                        }
                    });
                },
                error: function () {
                    Toast.fire({
                        icon: 'error',
                        title: 'Error...',
                        text: 'Create fail!',
                        footer: '<a href="">Why do I have this issue?</a>'
                    });
                }
            });
        }
		return true;
	}
	else {
		return false;
	}
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
		$('.invalid-feedback1').css('display', 'none');
		return true;
	} else {
		$('#userName').css('border-color', 'red');
		$('.invalid-feedback1').css('display', 'block');
		return false;
	}
};
function checkValidEmail() {
    var email = $('#email').val();
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
		$('.invalid-feedback1').hide();
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