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
$('.onDeleteReview').click(function () {
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
                url: "/Admin/Review/Delete/" + _id,
                method: "DELETE",
                contentType: "application/json",
                success: function () {
                    Toast.fire({
                        icon: 'success',
                        title: 'Delete successfully',
                        timer: 1200,
                        willClose: () => {
                            location.href = "/Admin/Review/Index";
                        }
                    });
                },
                error: function () {
                    Toast.fire({
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

function checkValidContent() {
    var content = $('#content-text').val().trim();
    if (content != '' && content != null) {
        $('#content-text').css('border-color', '#ccc');
        $('.invalid-content').css('display', 'none');
        return true;
    } else {
        $('#content-text').css('border-color', 'red');
        $('.invalid-content').css('display', 'block');
        return false;
    }
};

$(document).ready(function() {
    $(document).on('focusin', '#content-text',
        function() {
            $('#content-text').css('border-color', '#ccc');
            $('.invalid-content').hide();
        });
    $(document).on('focusout', '#content-text',
        function() {
             checkValidContent();
        });
});
$('.getReview').click(function() {
    var description = $(this).attr("data-description");
    $("#content-text").val(description);
    var _id = $(this).attr("data-idReview");
    $("#idReview").val(_id);
    var userId = $(this).attr("data-userId");
    $("#UserId").val(userId);
    var productId = $(this).attr("data-productId");
    $("#ProductId").val(productId);
    var createAt = $(this).attr("data-createAt");
    $("#CreateAt").val(createAt);

});

$('#onUpdateReview').click(function() {
    var _review = new Object();
    _review.Id = $("#idReview").val().trim();
    _review.Description = $("#content-text").val().trim();
    _review.CreateAt = $("#CreateAt").val().trim();
    _review.UserId = $("#UserId").val().trim();
    _review.ProductId = $("#ProductId").val().trim();
    var isValidContent = checkValidContent();
    if (isValidContent) {
        $.ajax({
            type: "POST",
            url: "/Reviews/Put",
            data: _review,
            success: function(data) {
                Toast.fire({
                    icon: 'success',
                    title: 'Update successfully',
                    timer: 1200,
                    confirmButtonText: 'Ok',
                    willClose: () => {
                        location.href = "/Reviews/Index";
                    }
                });
            },
            error: function() {
                Toast.fire({
                    icon: 'error',
                    title: 'Error...',
                    text: 'Update Fail!',
                    footer: '<a href="">Why do I have this issue?</a>'
                });
            }
        });
    }
});

