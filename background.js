// Listen for messages from pop.js to get the current tab URL and clear cookies from that domain
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log(request.message);
	var url = request.message;

	chrome.cookies.getAll({url: url}, function(cookies) {
		var allCookies = cookies;
		for (var i = 0; i < allCookies.length; i++) {
			chrome.cookies.remove({url: url, name: allCookies[i].name}, function(obj) {
					console.log('[CookieRefresh] cleared cookie: ' + obj);
			});
		}

		// Let the popup.js script know that clearing cookies have been finished
		chrome.runtime.sendMessage({message: 'cookies cleared'}, function(response) {});

	});

});
