chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request.message);
  const url = request.message;

  if (!url) return;

  chrome.cookies
    .getAll({ url: url })
    .then((cookies) => {
      const allCookies = cookies;
      const clearPromises = [];

      for (let i = 0; i < allCookies.length; i++) {
        clearPromises.push(
          chrome.cookies
            .remove({ url: url, name: allCookies[i].name })
            .then((obj) => {
              console.log('[CookieRefresh] cleared cookie: ', obj);
            })
            .catch((error) => {
              console.error('[CookieRefresh] error clearing cookie: ', error);
            })
        );
      }

      Promise.all(clearPromises).then(() => {
        chrome.runtime
          .sendMessage({ message: 'cookies cleared' })
          .catch((error) => {
            console.error('[CookieRefresh] error sending message: ', error);
          });
      });
    })
    .catch((error) => {
      console.error('[CookieRefresh] error getting cookies: ', error);
    });

  return true;
});
