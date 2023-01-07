/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const NewsView = require('./newsView');

describe(NewsView, () => {

  beforeEach(() => {
    const html = fs.readFileSync("./index.html");
    document.body.innerHTML = html;
  });

  it('Passes user input to the client class', () => {
    const mockClient = {
      loadNews: (search, callback) => {
        expect(search).toEqual("Maths");
      },
    };

    const mockModel = {
      setNews: () => {},
      getNews: () => {},
    };

    new NewsView(mockModel, mockClient);

    const inputEl = document.querySelector('#search-input');
    inputEl.value = "Maths";

    const buttonEl = document.querySelector('#search-button');
    buttonEl.click();
  });

  it("Passes the data from the client class to the model", () => {
    const mockClient = {
      loadNews: (search, callback) => {
        const mockArticle = {
          response: {results: {webTitle: "Mock article"}}
        };
        callback(mockArticle);
      },
    };

    const mockModel = {
      setNews: (data) => {
        expect(data).toEqual({
          response: {results: {webTitle: "Mock article"}}
        })
      },
      getNews: () => {
        {response: {results: {webTitle: "Mock article"}}}
      },
    };

    const view = new NewsView(mockModel, mockClient);

    const buttonEl = document.querySelector('#search-button');
    buttonEl.click();
  });

  it("Passes user input to the client class, and passes the response to the model", () => {
    const mockClient = {
      loadNews: (search, callback) => {
        expect(search).toEqual("Maths");
        const data = {response: {results: {webTitle: "Mock article"}}};
        callback(data);
      },
    };

    const mockModel = {
      getNews: jest.fn(),
      setNews: jest.fn(),
    };

    const view = new NewsView(mockModel, mockClient);

    const inputEl = document.querySelector('#search-input');
    inputEl.value = "Maths";

    const buttonEl = document.querySelector('#search-button');
    buttonEl.click();

    expect(mockModel.setNews).toHaveBeenCalledWith({
      response: {results: {webTitle: "Mock article"}}
    });
  });
});