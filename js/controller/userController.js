$('#loginForm').on('submit',function(e){
    e.preventDefault();
    let mobileNo=$('#loginMobileNumber').val();
    let pass=$('#loginPassword').val();
    console.log(mobileNo+ " "+pass);

    $('#loginForm').trigger("reset");
});