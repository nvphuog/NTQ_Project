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
$('.onDeleteProductType').click(function () {
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