<?php

if (!empty($_FILES['file'])) {
    foreach ($_FILES['file']['name'] as $key => $name) {
        if ($_FILES['file']['error'][$key] == 0 && move_uploaded_file($_FILES['file']['tmp_name'][$key],
                "images/{$name}")
        ) {
            $uploaded[] = $name;
        }
    }

    if (!empty($_POST['ajax'])) {
        die(json_encode($uploaded));
    };
}

?>

<!DOCTYPE>
<HTML>
<head>
    <meta charset="utf-8" name="viewport" content="width=device-width, initial-scale=1">
    <title>Upload File</title>
    <script type="text/javascript" src="upload.js"></script>
    <style type="text/css">
        #upload_progress {
            display: none;
        }
    </style>
</head>
<body>
<div id="uploaded">
    <?php

    if (!empty($uploaded)) {
        foreach ($uploaded as $name) {
            echo '<div><a href="images/', $name, '">', $name, '</a></div>';
        }
    }

    ?>
</div>
<div id="upload_progress"></div>
<div>
    <form action="" method="post" enctype="multipart/form-data">
        <div>
            <input type="file" id="file" name="file[]" multiple="multiple"/>
            <input type="submit" id="submit" value="Upload"/>
        </div>
    </form>
</div>
</body>
</html>
