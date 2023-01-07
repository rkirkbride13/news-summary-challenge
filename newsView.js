class NewsView {
  constructor(model, client) {
    this.inputEl = document.querySelector('#search-input');
    this.model = model;
    this.client = client;
    this.mainContainer = document.querySelector('#main-container');
    // document.querySelector('#search-input').addEventListener("keypress", (event) => {
    //   if (event.key === "Enter") {
    //     event.preventDefault();
    //     document.querySelector('#search-input').click()
    //   }
    //   this.fetchNews();
    // });
    document.querySelector('#search-button').addEventListener("click", () => {
      this.fetchNews();
    });
  }

  displayNews() {
    this.#removeNews();
    console.log(this.model.getNews())
    this.model.getNews().response.results.forEach(article => {
      const newsEl = document.createElement('div');
      newsEl.innerHTML = `
        <div class="article">
        <a href="${article.webUrl}" target="_blank" class="link">
        <h2 class="articletitle">${article.webTitle}</h2>
        </a>
        <img src="${article.fields.thumbnail}" class="articleimg" loading=lazy>
        </div>
      `;
      this.mainContainer.append(newsEl);
    });
  }

  fetchNews() {
    const search = this.inputEl.value
    this.client.loadNews(search, (news) => {
      this.model.setNews(news);
      this.displayNews();
    });
  }

  #removeNews() {
    this.mainContainer.querySelectorAll('div').forEach(article => article.remove());
  }

}

module.exports = NewsView;