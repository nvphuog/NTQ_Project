$('.onDeleteWishList').click(function () {
    var _id = $(this).attr('data-id');
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
                            location.href = "/WishList/ViewWishList";
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