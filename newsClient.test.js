const NewsClient = require('./newsClient');
const key = require("./apiKey")

require('jest-fetch-mock').enableMocks()

describe(NewsClient, () => {

  beforeEach(() => {
    fetch.resetMocks();
  });

  it('calls loadNews which uses fetch to load news', (done) => {
    const newsClient = new NewsClient();

    fetch.mockResponseOnce(JSON.stringify({
      webTitle: "Mock article",
      webPublicationDate: "2023-01-06"
    }));

    newsClient.loadNews("", (data) => {
      expect(data.webTitle).toBe("Mock article");
      expect(data.webPublicationDate).toBe("2023-01-06");
      done()
    });
  });
})