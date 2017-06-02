// Get URL of selected tab and send it to the background.js file
chrome.tabs.getSelected(null,function(tab) {
  var tablink = tab.url;
  console.log(tablink);
  chrome.runtime.sendMessage({message: tab.url}, function(response) {});
});

// Once cookies have been cleared, reload the page
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.message === 'cookies cleared') {
  	chrome.tabs.reload();
	}
});