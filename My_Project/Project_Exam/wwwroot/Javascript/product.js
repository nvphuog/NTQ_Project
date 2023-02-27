var regexNumber = /^[0-9]+$/;
var regexName = /^[a-z0-9_-]{2,50}$/;
var regexSlug = /^[a-z0-9_-]{2,150}$/;
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
$('.onDeleteProduct').click(function () {
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
                url: "/Admin/Product/Delete/" + _id,
                method: "DELETE",
                contentType: "application/json",
                success: function () {
                    Toast.fire({
                        icon: 'success',
                        title: 'Delete successfully',
                        timer: 1200,
                        willClose: () => {
                            location.href = "/Admin/Product/Index";
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
    var name = $('#nameProduct').val().trim();
    if (name != '' && name != null) {
        $('#nameProduct').css('border-color', '#ccc');
        $('.invalid-nameProduct').css('display', 'none');
        if (!regexName.test(name)) {
            $('#nameProduct').css('border-color', 'red');
            $('.invalid-nameProductFomat').css('display', 'block');
        }
        else {
            $('#nameProduct').css('border-color', '#ccc');
            $('.invalid-nameProductFomat').css('display', 'none');
        }
        return true;
    } else {
        $('#nameProduct').css('border-color', 'red');
        $('.invalid-nameProduct').css('display', 'block');
        return false;
    }
};
function checkValidSlug() {
    var slug = $('#slug').val().trim();
    if (slug != "" && slug != null) {
        $('#slug').css('border-color', '#ccc');
        $('.invalid-slug').css('display', 'none');
        if (!regexSlug.test(slug)) {
            $('#slug').css('border-color', 'red');
            $('.invalid-slugFomat').css('display', 'block');
        } else {
            $('#slug').css('border-color', '#ccc');
            $('.invalid-slugFomat').css('display', 'none');
        }
        return true;
    } else {
        $('#slug').css('border-color', 'red');
        $('.invalid-slug').css('display', 'block');
        return false;
    }
};
function checkValidPrice() {
    var price = $('#price').val().trim();
    if (price != "" && price != null) {
        $('#price').css('border-color', '#ccc');
        $('.invalid-price').hide();
        
        if (!regexNumber.test(price)) {
            $('#price').css('border-color', 'red');
            $('.invalid-fomatPrice').show();
        } else {
            $('#price').css('border-color', '#ccc');
            $('.invalid-fomatPrice').hide();
        }
    } else {
        $('#price').css('border-color', 'red');
        $('.invalid-price').show();
        return false;
    };
};
function checkValidDiscount() {
    var discount = $('#discount').val().trim();
    debugger 
    if (discount != "" && discount != null) {
        $('#discount').css('border-color', '#ccc');
        $('.invalid-discount').hide();
        if (!regexNumber.test(discount)) {
            $('#discount').css('border-color', 'red');
            $('.invalid-fomatDiscount').css("display", "block");
        } else {
            $('#discount').css('border-color', '#ccc');
            $('.invalid-fomatDiscount').hide();
        }
    } else {
        $('#discount').css('border-color', 'red');
        $('.invalid-discount').show();
        return false;
    };
};
function checkValidAmount() {
    var amount = $('#amount').val().trim();
    if (amount != "" && amount != null) {
        $('#amount').css('border-color', '#ccc');
        $('.invalid-amount').hide();

        if (!regexNumber.test(amount)) {
            $('#amount').css('border-color', 'red');
            $('.invalid-fomatAmount').show();
        } else {
            $('#amount').css('border-color', '#ccc');
            $('.invalid-fomatAmount').hide();
        }
    } else {
        $('#amount').css('border-color', 'red');
        $('.invalid-amount').show();
        return false;
    };
};
function checkValidImage() {
    var image = $('#image').val().trim();
    if (image != "" && image != null) {
        $('#image').css('border-color', '#ccc');
        $('.invalid-image').hide();
    } else {
        $('#image').css('border-color', 'red');
        $('.invalid-image').show();
        return false;
    }
};
$(document).ready(function () {
    //name
    $(document).on('focusin', '#nameProduct', function () {
        $('#nameProduct').css('border-color', '#ccc');
        $('.invalid-nameProduct').hide();
    });
    $(document).on('focusout', '#nameProduct', function () {
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
    //Price
    $(document).on('focusin', '#price', function () {
        $('#price').css('border-color', '#ccc');
        $('.invalid-price').hide();
    });
    $(document).on('focusout', '#price', function () {
        checkValidPrice();
    });
    //Discount
    $(document).on('focusin', '#discount', function () {
        $('#discount').css('border-color', '#ccc');
        $('.invalid-discount').hide();
    });
    $(document).on('focusout', '#discount', function () {
        checkValidDiscount();
    });
    //Amount
    $(document).on('focusin', '#amount', function () {
        $('#amount').css('border-color', '#ccc');
        $('.invalid-amount').hide();
    });
    $(document).on('focusout', '#amount', function () {
        checkValidAmount();
    });
    //Image
    $(document).on('focusin', '#image', function () {
        $('#image').css('border-color', '#ccc');
        $('.invalid-image').hide();
    });
    $(document).on('focusout', '#image', function () {
        checkValidImage();
    });
});
$('#onAddProduct').click(function() {
    checkValidName();
    checkValidSlug();
    checkValidPrice();
    checkValidDiscount();
    checkValidAmount();
    checkValidImage();
});
$('#onEditProduct').click(function () {
    checkValidName();
    checkValidSlug();
    checkValidPrice();
    checkValidDiscount();
    checkValidAmount();
    checkValidImage();
});