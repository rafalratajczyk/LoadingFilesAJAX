var handleUpload = function (event) {
    event.preventDefault();
    event.stopPropagation();

    var fileInput = document.getElementById('file');

    console.log(fileInput.files.length);

};

window.addEventListener('load', function (event) {
    var submit = document.getElementById('submit');
    submit.addEventListener('click', handleUpload);


});
