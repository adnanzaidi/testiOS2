var videosToDownload = [];
var filesDownloadedUris = {};

jQuery(function($) {
    /*
    $(document).on("click", ".single-video .video_container", function(e) {
        e.preventDefault();

        $inst = $(this).parents(".single-video");

        if ($inst.hasClass("playable")) {
            window.plugins.fileOpener.open($inst.data("uri"));
        } else {
            $fileName = $inst.data("name");
            $filepath = $inst.data("href");
            $title = $inst.data("title");

            //showProgressBar("Please wait...", "Fetching video...");
            $(this).addClass("loading");
            fs.root.getFile(getRootFolderName() + "/" + $fileName, { create: false, exclusive: false }, function(file) {
                //hideProgressBar();
                $(this).removeClass("loading");

                var fileUri = theFile.fullPath;
                window.plugins.fileOpener.open(cordova.file.externalRootDirectory + fileUri);

            }, function(error) {
                addVideoToQueue($filepath, $fileName, $title);
            });
        }
    });
    */

    $(document).on("click", ".single-video .video_container", function(e) {
        e.preventDefault();

        $inst = $(this).parents(".single-video");
        $src = $inst.data("src");
        $filename = $inst.attr("data-filename");
        $filepath = $inst.attr("data-filepath");
        $captionID = $inst.attr("data-id");
        $href = getServerUrl() + "/fetch.php?action=download";
		
		updateReadVideos($filename);
		
		$(this).find(".tick").show();
		video_log("Video Played: "+ $captionID);
		
        showProgressBar("", "Streaming...");

        var d = {
            file_name: $filename,
            file_path: $filepath
        };
        console.log($filename);
        console.log($filepath);
        
        $.ajax({
            url: $href,
            type: "GET",
            dataType: "JSON",
            data: d,
            success: function(e) {
                hideProgressBar();
                window.plugins.streamingMedia.playVideo($src);
            },
            error: function() {
                hideProgressBar();
                dialog("Please try again later", "Streaming failed");
                console.log("Error downloading file");
            }
        });
    });
});

function addVideoToQueue(videoPath, name, title) {
    downloadFile(videoPath, name, title);
}

function basename(str) {
    var base = new String(str).substring(str.lastIndexOf('/') + 1);
    if (base.lastIndexOf(".") != -1)
        base = base.substring(0, base.lastIndexOf("."));
    return base;
}

function downloadFile(path, name, title) {
	$(".single-video[data-name='" + name + "'] .video_container").addClass("loading");
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
        function onFileSystemSuccess(fileSystem) {
            fileSystem.root.getFile(
                "test.app", { create: true, exclusive: false },
                function gotFileEntry(fileEntry) {
                    var sPath = fileEntry.fullPath.replace("test.app", "");
                    var fileTransfer = new FileTransfer();
                    fileEntry.remove();

                    var fileName = cordova.file.externalRootDirectory + getRootFolderName() + "/" + title + ".mp4";

                    fileTransfer.download(
                        path,
                        fileName,
                        function(theFile) {
                            var fileUri = theFile.fullPath;
                            //hideProgressBar();
                            $(".single-video[data-name='" + name + "'] .video_container").removeClass("loading");
                            console.log("download complete: " + fileUri);

                            //showProgressBar("Please wait...", "Scanning gallery...");
                            /*
                            MediaScanner.scanMedia(cordova.file.externalRootDirectory + getRootFolderName(),
                                function() {
                                    //hideProgressBar();
                                    //dialog("Scanned");
                                },
                                function(err) {
                                    //hideProgressBar();
                                    //dialog("Failed");
                                });
                            */
                            $(".single-video[data-name='" + name + "']")
                                .addClass("playable")
                                .attr("data-uri", cordova.file.externalRootDirectory + fileUri);

                            // play downloaded video
                            window.plugins.fileOpener.open(cordova.file.externalRootDirectory + fileUri);
                        },
                        function(error) {
                            //hideProgressBar();
                            $(".single-video[data-name='" + name + "'] .video_container").removeClass("loading");
                            dialog("Failed to get video", "Failed");
                        }
                    );
                }, onFileFailed);
        }, onFileFailed);
}

function onDirectorySuccess() {

}

function onFileFailed() {
    console.log("failed");
    dialog("Failed to get video", "Failed");
}

function scanFiles() {
    window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory + getRootFolderName(), function(dirEntry) {

        var directoryReader = dirEntry.createReader();
        directoryReader.readEntries(function(entries) {
            for (var i = 0; i < entries.length; i++) {
                filesDownloadedUris[entries[i].name] = cordova.file.externalRootDirectory + entries[i].fullPath;
            }
        }, function() {
            filesDownloadedUris = {};
        });

    }, function() {
        filesDownloadedUris = {};
    });
}
