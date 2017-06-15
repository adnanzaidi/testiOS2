function getMainServer() {
	return "http://clients.mediamonitors.com.pk/mmtvc";
	//return "http://203.81.226.89:2200";
}

function getServerUrl(host) {
	if(typeof host == "undefined" && localStorage.getItem("api_host"))
		return localStorage.getItem("api_host"); //203.81.226.89:2200
	
	return "http://"+host+"/mmnew/apis";
}

function getServers() {
	return ["203.81.226.89:2200"];
}

function getRootUrl() {
	return ".";
	//return "http://192.168.1.101:3000";
}

function getDataFilePath(host) {
	if(typeof host == "undefined" && localStorage.getItem("data_host"))
		return localStorage.getItem("data_host"); //203.81.226.89:2200

	return "http://"+host+"/mmnew/data"
}

function getRootFolderName() {
	return "MM TVC";
}

function getServerErrorMessage() {
	return "Server Down! Please Wait OR Try again later\nContact Number : 92-2134306575\n92-2134306576\n92-2134306577\nEmail : info@mediamonitors.com.pk";
}

function getServerErrorMessageTitle() {
	return "Server response";
}

function getInternetConnectionMessage() {
	return "Check Your Internet Connection. Contact Your Service Provider!";
}

function getInternetConnectionMessageTitle() {
	return "Connection response";
}

function getImeiErrorMessage() {
	return "Please contact support to login";
}

function getImeiErrorMessageTitle() {
	return "Login error";
}

function isConnected() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    return (networkState != Connection.NONE && networkState != Connection.UNKNOWN);
}

function redirect(url) {
	window.location.href = url;
}

function showProgressBar(t, m) {
	cordova.plugin.pDialog.init({title: t, message: m});
}

function hideProgressBar() {
	cordova.plugin.pDialog.dismiss();
}

function dialog(txt, heading) {
   navigator.notification.alert(txt, null, heading, "Ok");
}

function user_log(msg) {
	var user_id = localStorage.getItem("user_id");
	if (user_id != "" && typeof user_id != "undefined") {
		console.log(getServerUrl() + "/action.php?action=userLog&user_id=" + user_id);
		$.ajax({
			url: getServerUrl() + "/action.php?action=userLog&user_id=" + user_id,
			data: {
				message: msg
			},
			dataType: "JSON",
			type: "POST",
			success: function(e) {
				console.log(JSON.stringify(e));
			},
			error: function(e) {
				console.log(e);
			}
		});
	}
}



function video_log(msg) {
	var user_id = localStorage.getItem("user_id");
	var ip = localStorage.getItem("ip");
		 
		if (user_id != "" && typeof user_id != "undefined") {
			console.log(getServerUrl() + "/action.php?action=videoLog&user_id=" + user_id);
			$.ajax({
				url: getServerUrl() + "/action.php?action=videoLog&user_id=" + user_id,
				data: {
					message: msg,
					ip: ip
				},
				dataType: "JSON",
				type: "POST",
				success: function(e) {
					console.log(JSON.stringify(e));
				},
				error: function(e) {
					console.log(e);
				}
			});
		}
		
	}


	
/*
function setupPushNotification(onRegistration, onPush, onError) {
	var push = PushNotification.init({ "android": {"senderID": "666480915602"},
		 "ios": {"alert": "true", "badge": "true", "sound": "true"}, "windows": {} } );

	push.on('registration', onRegistration);

	push.on('notification', onPush);

	push.on('error', onError);
}
*/
function getReadVideos() {
	var read_videos = localStorage.getItem("read_videos");
	
	if(read_videos)
		try {
			read_videos = JSON.parse(read_videos);
		} catch(e) {
			read_videos = [];
		}
	else
		read_videos = [];
	
	return read_videos;
}

function updateReadVideos($filename) {
	var read_videos = getReadVideos();
	
	read_videos.push($filename);
	localStorage.setItem("read_videos", JSON.stringify(read_videos));
}

function isVideoRead($filename) {
	var read_videos = getReadVideos();
	return (read_videos.indexOf($filename) > -1);
}

$(document).ready(function(){$("a.transition").click(function(event){event.preventDefault();linkLocation=this.href;$("body").fadeOut(500, redirectPage);});function redirectPage(){window.location=linkLocation;}});$(function(){$('#search').on('keyup', function(){var pattern=$(this).val(); $('.searchable-container .search-items').hide(); $('.searchable-container .search-items').filter(function(){return $(this).text().match(new RegExp(pattern, 'i'));}).show();});}); $("document").ready(function($){var nav=$('#nextprviewsoptions'); $(window).scroll(function (){if ($(this).scrollTop() > 2){nav.addClass("f-nav");}else{nav.removeClass("f-nav"); document.getElementById('nextprviewsoptions').style.Display='none';}});}); $(document).ready(function(){var overlay=$('.sidebar-overlay'); $('.sidebar-toggle').on('click', function(){var sidebar=$('#sidebar'); sidebar.toggleClass('open'); if ((sidebar.hasClass('sidebar-fixed-left') || sidebar.hasClass('sidebar-fixed-right')) && sidebar.hasClass('open')){overlay.addClass('active');}else{overlay.removeClass('active');}}); overlay.on('click', function(){$(this).removeClass('active'); $('#sidebar').removeClass('open');});});$(document).ready(function(){var sidebar=$('#sidebar'); var sidebarHeader=$('#sidebar .sidebar-header'); var toggleButtons=$('.sidebar-toggle'); $('#sidebar-position').change(function(){var value=$( this ).val(); sidebar.removeClass('sidebar-fixed-left sidebar-fixed-right sidebar-stacked').addClass(value).addClass('open'); if (value=='sidebar-fixed-left' || value=='sidebar-fixed-right'){$('.sidebar-overlay').addClass('active');}});});

$(document).ready(function () {
	
	$(".match_parent").each(function() {
		$parent = $(this).parent();
		if($parent.is("html"))
			$parent = $(window);
		
		$(this).css("width", $parent.width());
		$(this).css("height", $parent.height());
	});
	
	$(".center_all").each(function() {
		$parent = $(this).parent();
		$this = $(this);
	
		$padTop = ($parent.height() - $(this).height()) / 2;
		$padLeft = ($parent.width() - $(this).width()) / 2;
		
		$(this).css("margin-top", $padTop);
		$(this).css("margin-left", $padLeft);
	});
	
	$(".fadeAfter").each(function() {
		var timeout = $(this).data("timeout");
		if(typeof timeout == "undefined")
			timeout = 1000;
		
		$(this).animate({
			opacity: 1
		}, timeout);
	});
	
    $('.material-button-toggle').click(function () {
        $(this).toggleClass('open');
        $('.option').toggleClass('scale-on');
    });

	function setModalMaxHeight(element) {
	  this.$element     = $(element);  
	  this.$content     = this.$element.find('.modal-content');
	  var borderWidth   = this.$content.outerHeight() - this.$content.innerHeight();
	  var dialogMargin  = $(window).width() < 768 ? 20 : 60;
	  var contentHeight = $(window).height() - (dialogMargin + borderWidth);
	  var headerHeight  = this.$element.find('.modal-header').outerHeight() || 0;
	  var footerHeight  = this.$element.find('.modal-footer').outerHeight() || 0;
	  var maxHeight     = contentHeight - (headerHeight + footerHeight);

	  this.$content.css({
		  'overflow': 'hidden'
	  });
	  
	  this.$element
		.find('.modal-body').css({
		  'max-height': maxHeight,
		  'overflow-y': 'auto'
	  });
	}

	$('.modal').on('show.bs.modal', function() {
	  $(this).show();
	  setModalMaxHeight(this);
	});

	$(window).resize(function() {
	  if ($('.modal.in').length != 0) {
		setModalMaxHeight($('.modal.in'));
	  }
	});
	
});



