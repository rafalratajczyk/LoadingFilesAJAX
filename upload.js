var handleUpload = function (e) {
    e.preventDefault();
    e.stopPropagation();

    var fileInput = document.getElementById('file');

    var data = new FormData();

    for (var i = 0; i < fileInput.files.length; i++) {
        data.append('file[]', fileInput.files[i]);
    }

    var request = new XMLHttpRequest();

    request.upload.addEventListener('progress', function (e) {
        if (e.lengthComputable) {
            var percent = e.loaded / e.total;
            var progress = document.getElementById('upload_progress');

            while (progress.hasChildNodes()) {
                progress.removeChild(progress.firstChild);
            }

            progress.appendChild(document.createTextNode(Math.round(percent * 100) + ' %'));
        }


    });

    request.upload.addEventListener('load', function (e) {
        document.getElementById('upload_progress').style.display = 'none';

    });

    request.upload.addEventListener('error', function (e) {


    });

};

window.addEventListener('load', function (e) {
    var submit = document.getElementById('submit');
    submit.addEventListener('click', handleUpload);


});
