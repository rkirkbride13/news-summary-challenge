class NewsModel {
  constructor() {
    this.news = [];
  }

  getNews() {
    return this.news;
  }

  setNews(news) {
    this.news = news;
  }

}

module.exports = NewsModel;