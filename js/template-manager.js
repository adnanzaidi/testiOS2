function getSingleVideoTemplate($video) {
	$id = $video.captionID + "_" + $video.categoryID;
	$filename = $id + ".mp4";
	$thumb = $id + ".jpg";

	$filename = $video.fileName.replace(".flv", ".mp4");
	$thumb = $filename.replace(".mp4", ".jpg");
	
	//$src = getDataFilePath() + "/videos/" + $video.fileName;
	$src = getServerUrl() + "/fetch.php?action=fetchVideo&filename=" + $video.fileName;
	$thumb_src = getDataFilePath() + "/thumbs/" + $thumb;
	$default_thumb_src = getDataFilePath() + "/thumbs/default.jpg";
	
	$tag_main = $("<div/>")
				.attr("id", "video"+$video.captionID)
				.addClass("single-video")
				.attr("data-href", $src)
				.attr("data-filename", $video.fileName)
				.attr("data-filepath", $video.filePath)
				.attr("data-id", $video.captionID)
				.attr("data-src", getServerUrl().replace("apis", "data")+"/videos/"+$filename)
				.attr("data-name", $filename)
				.attr("data-title", $video.captionName + $video.filePath + $video.fileName + ",," + $src);
	$tag_clear_div = $("<div/>")
						.addClass("clearfix");
	$tag_left_div = $("<div/>")
						.addClass("col-md-8");
	$tag_v_container = $("<div/>")
						.addClass("video_container")
						.css("margin-top", 10);

	$tag_right_div = $("<div/>")
						.addClass("col-md-4");
	$tag_video = $("<img/>")
						.attr("width", "100%")
						.attr("src", $thumb_src)
						.on('error', function() {
							$(this).attr("src", $default_thumb_src);
						});
	$tag_v_container.append($tag_video);
	$tag_href = $("<a/>")
					.attr("href", $src)
					.addClass("video_href");
	$tag_v_container.append($tag_href);
	
	$tag_tick = $("<span/>")
					.addClass("tick glyphicon glyphicon-ok")
					.hide();
	$tag_v_container.append($tag_tick);
	
	//var read_videos = getReadVideos();
	//$tag_tick.text(read_videos.indexOf($video.fileName));
	
	if(isVideoRead($video.fileName))
		$tag_tick.show();

	$tag_details_div = $("<div/>")
							.addClass("details");
	$tag_download_button = $("<div/>")
								.addClass("videoDownloadButton")
								.append($("<span/>")
												.addClass("video-download-link hide glyphicon glyphicon-download")
												.attr("data-href", $src)
												.attr("data-name", $filename));
	$tag_title_h3 = $("<h3/>")
						.append($("<div/>")
						.addClass("videoTitle")
						.text($video.captionName))
						.append($tag_clear_div);
	

	$tag_subtitle_h4 = $("<h4/>")
						.text("Category: " + $video.categoryName)
						.addClass("videoCategory");
	$tag_details_div.append($tag_title_h3);					
	$tag_details_div.append($tag_subtitle_h4);
 
    $tag_text = $("<span/>")
						.html("Brand: " + $video.brandName)
						.addClass("videoBrand");
	$tag_details_div.append($tag_text);

	var transmissionDate = new Date($video.transmissionDate);
	transmissionDate = transmissionDate.getDate() + "-" + (transmissionDate.getMonth()+1) + "-" + transmissionDate.getFullYear();

	$tag_text = $("<span/>")
						.html("Transmission Date: " + transmissionDate)
						.addClass("videoBrand");
	$tag_details_div.append($tag_text);

	var duration = $video.videoDuration;
	var d = duration + " sec";
	if(duration > 60)
		d = Math.ceil(duration / 60) + " min";

	$tag_text = $("<span/>")
						.html("Duration: " + d)
						.addClass("videoBrand");
	$tag_details_div.append($tag_text);

	$tag_text = $("<span/>")
						.html("Channel: " + $video.channelName)
						.addClass("videoBrand");
	$tag_details_div.append($tag_text);

	$tag_text = $("<span/>")
						.html("Start time: " + $video.startTime)
						.addClass("videoBrand");
	$tag_details_div.append($tag_text);

	$share_button = $("<a/>")
						.attr("data-toggle", "modal")
						.attr("data-target", "#sharing")
						.attr("data-id", $video.captionID)
						.attr("data-file-path", $video.filePath + $video.fileName)
						.html("<span class='glyphicon glyphicon-share-alt'></span> Share this video")
						.addClass("btn btn-primary share-button");
	$tag_details_div.append($share_button);

	$tag_right_div.append($tag_details_div);
	$tag_left_div.append($tag_v_container);

	$tag_main.append($tag_left_div);
	$tag_main.append($tag_right_div);
	
	$tag_main.append($tag_clear_div);
	
	if(typeof filesDownloadedUris[$video.captionName + ".mp4"] != "undefined") {
		$tag_download_button.hide();
		
		$tag_main.addClass("playable");
		$tag_main.attr("data-uri", filesDownloadedUris[$video.captionName + ".mp4"]);
	}
	
	return $tag_main;
}

function showError(form_obj, message) {
	if(form_obj.find("div.error").length > 0) {
		form_obj.find("div.error").text(message);
	} else {
		$error_div = $("<div/>")
						.addClass("alert alert-danger error")
						.text(message);
		form_obj.prepend($error_div);
	}
}

function showSuccess(form_obj, message) {
	if(form_obj.find("div.success").length > 0) {
		form_obj.find("div.success").text(message);
	} else {
		$success_div = $("<div/>")
						.addClass("alert alert-success success")
						.text(message);
		form_obj.prepend($success_div);
	}
}

function hideError(form_obj) {
	if(form_obj.find("div.error").length > 0) {
		form_obj.find("div.error").remove();
	}
}

function hideSuccess(form_obj) {
	if(form_obj.find("div.success").length > 0) {
		form_obj.find("div.success").remove();
	}
}

function showToastMessage(message) {
	$div_toast = $("<div/>")
					.addClass("toast")
					.hide();
	$div_toast_msg = $("<div/>")
					.addClass("toast-msg")
					.text(message);
	$div_toast.append($div_toast_msg);
	$("body").append($div_toast);
	
	$div_toast.fadeIn();
	
	setInterval(function() {
		$div_toast.fadeOut();
	}, 2000);
}