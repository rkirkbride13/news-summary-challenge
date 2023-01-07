const key = require("./apiKey")

class NewsClient {

  loadNews(search, callback) {
    let URL
    if (search === "") {
      URL = `https://content.guardianapis.com/search?show-fields=thumbnail&api-key=${key}`
    } else {
      URL = `https://content.guardianapis.com/search?show-fields=thumbnail&q=${search}&api-key=${key}`
    };
    fetch(URL)
      .then((response) => response.json())
      .then((responseData) => {
        callback(responseData);
      })
  }

}

module.exports = NewsClient;