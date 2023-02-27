var regexName = /^[A-Za-z0-9_-]{2,10}$/;
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
$('.onDeleteShop').click(function () {
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
                url: "/Admin/Shops/Delete/" + _id,
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

var flag = true;
var flagUpdate = true;
function checkValidName() {
    var name = $('#nameShop').val().trim();
    if (name != '' && name != null) {
        $('#nameShop').css('border-color', '#ccc');
        $('.invalid-nameShop').css('display', 'none');
        if (!regexName.test(name)) {
            $('#nameShop').css('border-color', 'red');
            $('#invalid-format').css('display', 'block');
        }
        else {
            $('#nameShop').css('border-color', '#ccc');
            $('#invalid-format').css('display', 'none');
        }
        return true;
    } else {
        $('#nameShop').css('border-color', 'red');
        $('.invalid-nameShop').css('display', 'block');
        return false;
    }
};
function checkValidSlug() {
    var slug = $('#slug').val().trim();
    if (slug != "" && slug != null) {
        $('#slug').css('border-color', '#ccc');
        $('.invalid-slug').css('display', 'none');
        return true;
    } else {
        $('#slug').css('border-color', 'red');
        $('.invalid-slug').css('display', 'block');
        return false;
    }
};
function CheckExistsName() {
    debugger 
    var id = $('#nameShop').val().trim();
    $.ajax({
        method: "GET",
        url: "/Admin/Shops/CheckExistsName/" + id,
        type: "json",
        success: function (data) {
            let message = document.querySelector('#existsName');
            if (data) {
                message.innerText = "";
                $('#nameShop').css('border-color', '#ccc');
                flag = true;
                return true;
            } else {
                message.innerText = "Name already exists!";
                $('#nameShop').css('border-color', 'red');
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
function CheckExistsPutName(id) {
    var name = $('#nameShop').val().trim();
    $.ajax({
        method: "GET",
        url: "/Admin/Shops/CheckExistsPutName?id=" + id + "&name=" + name,
        type: "json",
        success: function (data) {
            let message = document.querySelector('#existsName');
            if (data == true) {
                message.innerText = "";
                $('#nameShop').css('border-color', '#ccc');
                flagUpdate = true;
                return true;
            } else {
                message.innerText = "Name already exists!";
                $('#nameShop').css('border-color', 'red');
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
$(document).ready(function () {
    //name
    $(document).on('focusin', '#nameShop', function () {
        $('#nameShop').css('border-color', '#ccc');
        $('.invalid-nameShop').hide();
    });
    $(document).on('focusout', '#nameShop', function () {
        checkValidName();
    });
    //slug
    $(document).on('focusin', '#slug', function () {
        $('#slug').css('border-color', '#ccc');
        $('.invalid-slug').hide();
    });
    $(document).on('focusout', '#slug', function () {
        checkValidSlug();
    });
});
$('#onAddShop').click(function () {
    checkValidName();
    checkValidSlug();
});