"use strict";
const yaml = require("js-yaml");
const fs   = require("fs");
const expect = require("chai").expect;
const getId = require("../../../lib/get-elements.js");
let baseUrl;
beforeEach(function () {
  const browserConfig = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/config/settings.yml", "utf8"));
  baseUrl = browserConfig.base_url.toString();
  browser.url(baseUrl);
  // browser.getSession().then(function (sessionid) {
  //   browser.sessionID = sessionid.id_;
  // });
});

describe("user", function () {
  it("verify user is able to cancel an order", function () {
    const eleMap = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/elements/element-map.yml", "utf8"));
    const eleIds = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/elements/element-ids.yml", "utf8"));
    const usrData = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/config/user-data.yml", "utf8"));

    // default to process env if we've got that
    const adminEmail = process.env.REACTION_EMAIL || usrData.admin_email;
    const adminPassword = process.env.REACTION_AUTH || usrData.admin_pw;

    browser.pause("5000");
    browser.click(eleMap.login_dropdown_btn);
    browser.pause("5000");
    browser.setValue(getId.retId(eleIds.login_email_fld_id), adminEmail);
    browser.setValue(getId.retId(eleIds.login_pw_fld_id), adminPassword);
    browser.click(eleMap.login_btn);
    browser.pause("5000");
    browser.click(".product-grid-item-images");
    browser.pause("5000");
    browser.click(".variant-select-option");
    browser.pause("6000");
    browser.scroll(0,300);
    browser.click(eleMap.red_option);
    browser.click(".js-add-to-cart");
    browser.click(".cart-alert-checkout");
    browser.pause("5000");
    browser.scroll(0,500);
    browser.click(eleMap.free_shipping);
    browser.click("//span[text()='Example Payment']");
    browser.pause("2000");
    browser.setValue("input[name='cardNumber']",usrData.visa);
    browser.click("select[name='expireMonth']");
    browser.click("option[value='1']");
    browser.pause(2000);
    browser.click("select[name='expireYear']");
    browser.pause(2000);
    browser.click("option[value='2020']");
    browser.setValue("input[name='cvv']", usrData.cvv);
    browser.pause(2000);
    browser.click("#btn-complete-order");
    browser.pause("5000");
    browser.click("button[name='cancel']");
    browser.click(eleMap.confirm_cancel_order);
    browser.pause("5000");
    expect(browser.getText("#order-status")).to.equal("Your order is now canceled.");
  });
});
