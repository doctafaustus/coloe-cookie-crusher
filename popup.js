chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  const tablink = tabs[0].url;
  console.log(tablink);
  chrome.runtime.sendMessage({ message: tablink }).catch((error) => {
    console.error('[CookieRefresh] Error sending message: ', error);
  });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'cookies cleared') {
    chrome.tabs.reload();
  }
});

setTimeout(function () {
  window.close();
}, 400);
