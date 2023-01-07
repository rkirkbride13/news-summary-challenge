const NewsModel = require('./newsModel');

describe(NewsModel, () => {
  let newsModel;
  beforeEach(() => {
    newsModel = new NewsModel();
  });

  it('creates an empty array', () => {
    expect(newsModel.getNews()).toEqual([]);
  });

  it('adds news articles', () => {
    newsModel.setNews("News 1");
    expect(newsModel.getNews()).toEqual("News 1");
    newsModel.setNews("News 2");
    expect(newsModel.getNews()).toEqual("News 2");
  });
})