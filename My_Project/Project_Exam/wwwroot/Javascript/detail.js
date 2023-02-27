var regexNumber = /^[0-9]+$/;
$('.onRemoveWishList').click(function () {
    debugger 
    var _id = $(this).attr('data-id');
    var _productId = $(this).attr('data-productId');
    Swal.fire({
        title: 'Do you want to delete this wishList?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Delete',
        denyButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "/WishList/Delete/" + _id,
                method: "DELETE",
                contentType: "application/json",
                success: function () {
                    Toast.fire({
                        icon: 'success',
                        title: 'Delete wishList successfully',
                        timer: 1200,
                        willClose: () => {
                            location.href = "/Products/Details/" + _productId;
                        }
                    });
                },
                error: function () {
                    Toast.fire({
                        icon: 'error',
                        title: 'Delete fail!'
                    });
                }
            });
        }
    });
});
$('#onAddWishList').click(function () {
    var _wishList = new Object();
    _wishList.UserId = $(this).attr('data-userId');
    _wishList.ProductId = $(this).attr('data-productId');
    $.ajax({
        type: "POST",
        url: "/WishList/Post",
        data: _wishList,
        success: function (data) {
            Toast.fire({
                icon: 'success',
                title: 'Successfully',
                timer: 2300,
                confirmButtonText: 'Ok',
                willClose: () => {
                    location.href = "/Products/Details/" + _review.ProductId;
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
});

function checkValidContent() {
    debugger
    var reviews = $('#txt_reviews').val().trim();
    if (reviews != '' && reviews != null) {
        $('#txt_reviews').css('border-color', '#ccc');
        $('.invalid-txt_reviews').css('display', 'none');
        return true;
    } else {
        $('#txt_reviews').css('border-color', 'red');
        $('.invalid-txt_reviews').css('display', 'block');
        return false;
    }
};
function checkValidPriceStart() {
    var from = $('#from').val().trim();
    if (from != "" && from != null) {
        if (!regexNumber.test(from)) {
            $('#from').css('border-color', 'red');
            $('.invalid-from').show();
        } else {
            $('#from').css('border-color', '#ccc');
            $('.invalid-from').hide();
        }
    }
};
function checkValidPriceEnd() {
    var to = $('#to').val().trim();
    if (to != "" && to != null) {
        if (!regexNumber.test(to)) {
            $('#to').css('border-color', 'red');
            $('.invalid-to').show();
        } else {
            $('#to').css('border-color', '#ccc');
            $('.invalid-to').hide();
        }
    }
};
$(document).ready(function() {
    $(document).on('focusin',
        '#txt_reviews',
        function() {
            $('#txt_reviews').css('border-color', '#ccc');
            $('.invalid-txt_reviews').hide();
        });
    $(document).on('focusout',
        '#txt_reviews',
        function() {
            checkValidContent();
        });
    $(document).on('focusin',
        '#from',
        function () {
            $('#from').css('border-color', '#ccc');
            $('.invalid-txt_reviews').hide();
        });
    $(document).on('focusout',
        '#from',
        function () {
            checkValidPriceStart();
        });
    $(document).on('focusin',
        '#to',
        function () {
            $('to').css('border-color', '#ccc');
            $('.invalid-to').hide();
        });
    $(document).on('focusout',
        '#to',
        function () {
            checkValidPriceEnd();
        });
});
$("#onAddReview").click(function (){
    var _review = new Object();
    _review.Description = $('#txt_reviews').val();
    _review.UserId = $(this).attr('data-userId');
    _review.ProductId = $(this).attr('data-productId');
    var isValidContent = checkValidContent();
    if (isValidContent) {
        $.ajax({
            type: "POST",
            url: "/Reviews/Post",
            data: _review,
            dataType: 'json',
            success: function (data) {
                Toast.fire({
                    icon: 'success',
                    title: 'Successfully',
                    timer: 1200,
                    confirmButtonText: 'Ok',
                    willClose: () => {
                        location.href = "/Products/Details/" + _review.ProductId;
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
  
});