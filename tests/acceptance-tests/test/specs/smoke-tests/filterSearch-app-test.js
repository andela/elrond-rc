"use strict";
const yaml = require("js-yaml");
const fs = require("fs");
const expect = require("chai").expect;

beforeEach(function () {
  const browserConfig = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/config/settings.yml", "utf8"));
  const baseUrl = browserConfig.base_url.toString();
  browser.url(baseUrl);
});

describe("The Filter and Sort Search Feature", function () {
  it("Should filter search results by Vendor", () => {
    const searchQuery = "iphone";
    browser.waitForExist(".navbar-items", "5000");
    browser.waitForExist(".search", "5000");
    browser.click(".search");
    browser.waitForExist("#search-input", "5000");
    browser.setValue("#search-input", searchQuery);
    browser.scroll(0, 200);
    browser.click(".filter-search");
    browser.waitForExist("#filterSearch", "5000");
    browser.click("#vendor-filter");
    browser.waitForExist("#Apple", "10000");
    browser.click("#Apple");
    browser.waitForExist(".product-primary-images", "10000");
    browser.waitForExist(".grid-content", "5000");
    browser.waitForExist(".overlay", "5000");
    browser.waitForExist(".overlay-title", "5000");
    expect(browser.getText(".overlay-title")).to.contain("IPHONES");
  });
});