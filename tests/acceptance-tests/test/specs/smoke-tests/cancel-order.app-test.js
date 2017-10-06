"use strict";
const yaml = require("js-yaml");
const fs   = require("fs");
const expect = require("chai").expect;
const getId = require("../../../lib/get-elements.js");

beforeEach(function () {
  const browserConfig = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/config/settings.yml", "utf8"));
  const baseUrl = browserConfig.base_url.toString();
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
    browser.pause(5000);
    browser.setValue(getId.retId(eleIds.login_email_fld_id), adminEmail);
    browser.setValue(getId.retId(eleIds.login_pw_fld_id), adminPassword);
    browser.click(eleMap.login_btn);
    browser.pause("5000");
    browser.click(eleMap.admin_dropdown_menu);
    browser.pause("5000");
    browser.click("a#dropdown-apps-dashboard/orders");
    browser.pause("5000");
    brower.click("button.btn.btn-sm.btn-danger.flex-item-fill");
    browser.pause("5000");
    browser.click("button.swal2-confirm swal2-styled");
    browser.pause("5000");
    expect(browser.getText("#order-status")).to.equal("Your order is now canceled.");
  });
});
