$('#onLogin').click(function () {
    checkValidEmail();
    checkValidPassword();

});
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