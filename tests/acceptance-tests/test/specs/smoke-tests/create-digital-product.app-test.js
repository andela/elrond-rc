const yaml = require("js-yaml");
const fs   = require("fs");
const expect = require("chai").expect;
const getId = require("../../../lib/get-elements.js");
const dotenv = require("dotenv");

dotenv.config();
beforeEach(function () {
  const browserConfig = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/config/settings.yml", "utf8"));
  const baseUrl = browserConfig.base_url.toString();
  browser.url(baseUrl);
});

describe("Digital product ", function () {
  it("should have upload button", function () {
    const eleMap = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/elements/element-map.yml", "utf8"));
    const eleIds = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/elements/element-ids.yml", "utf8"));
    const usrData = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/config/user-data.yml", "utf8"));

    // default to process env if we've got that
    const adminEmail = usrData.admin_email;
    const adminPw = usrData.admin_pw;

    browser.pause("5000");
    browser.click(eleMap.login_dropdown_btn);
    browser.pause(5000);
    browser.setValue(getId.retId(eleIds.login_email_fld_id), adminEmail);
    browser.setValue(getId.retId(eleIds.login_pw_fld_id), adminPw);
    browser.click(eleMap.login_btn);
    browser.pause("5000");
    // browser.click(eleMap.skip_tour);
    browser.pause("5000");
    browser.click(eleMap.open_create_product);
    browser.pause("5000");
    browser.click(eleMap.create_product);
    browser.pause("5000");
    browser.click(eleMap.select_product_type);
    browser.pause("2000");
    expect(browser.getAttribute("button", "btn btn-success no-round")).to.exist;
  });
});