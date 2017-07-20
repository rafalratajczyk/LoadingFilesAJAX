var handleUpload = function (e) {
    e.preventDefault();
    e.stopPropagation();

    var fileInput = document.getElementById('file');
    var data = new FormData();

    data.append('ajax', true);

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
        alert('Upload failed');
    });

    request.addEventListener('readystatechange', function (e) {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var links = document.getElementById('uploaded');
                var uploaded = eval(this.response);
                var div, a;

                for (var i = 0; i < uploaded.length; i++) {
                    div = document.createElement('div');
                    a = document.createElement('a');

                    a.setAttribute('href', 'images/' + uploaded[i]);
                    a.appendChild(document.createTextNode(uploaded[i]));

                    div.appendChild(a);
                    links.appendChild(div)
                }
            } else {
                console.log('Server ' + this.status);
            }
        }
    });

    request.open('POST', 'upload.php');
    request.setRequestHeader('Cache-Control', 'no-cache');
    request.send(data);

};

window.addEventListener('load', function (e) {
    var submit = document.getElementById('submit');
    submit.addEventListener('click', handleUpload);

});
