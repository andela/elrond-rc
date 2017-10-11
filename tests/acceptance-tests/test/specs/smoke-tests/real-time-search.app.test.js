// import yaml from "js-yaml";
// import fs from "fs";
const yaml = require("js-yaml");
const fs = require("fs");
const expect = require("chai").expect;

beforeEach(() => {
  const browserConfig = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/config/settings.yml", "utf8"));
  const baseUrl = browserConfig.base_url.toString();
  browser.url(baseUrl);
});

describe("The Real time search Feature", () => {
  it("should search for products having letter `b` when a user types `b` in the search box", () => {
    const inputText = "b";
    browser.waitForExist(".search", "5000");
    browser.click(".search");
    browser.waitForExist("#search-input", "5000");
    browser.setValue("#search-input", inputText);
    browser.waitForExist(".search-tag", "2000");
    expect(browser.getText(".search-tag")).to.contain("example-product");
  });
  it("should search for products having letter `a` when a user types `a` in the search box", () => {
    const inputText = "a";
    browser.waitForExist(".search", "5000");
    browser.click(".search");
    browser.waitForExist("#search-input", "5000");
    browser.setValue("#search-input", inputText);
    browser.waitForExist(".search-tag", "2000");
    expect(browser.getText(".search-tag")).to.contain("Shop");
    expect(browser.getText("#product-title")).to.contain("CARD");
  });
  it("should return only one product `Iphone6p` when the user enters ip", () => {
    const inputText = "ip";
    browser.waitForExist(".search", "5000");
    browser.click(".search");
    browser.waitForExist("#search-input", "5000");
    browser.setValue("#search-input", inputText);
    browser.waitForExist("#product-title", "2000")
    expect(browser.getText("#product-title")).to.contain("IPHONE 6P");
  });
});
