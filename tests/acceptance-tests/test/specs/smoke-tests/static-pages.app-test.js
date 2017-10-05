"use strict";
require("dotenv").load();
const yaml = require("js-yaml");
const fs   = require("fs");
const expect = require("chai").expect;
const getId = require("../../../lib/get-elements.js");

let baseUrl;
beforeEach(function () {
  const browserConfig = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/config/settings.yml", "utf8"));
  baseUrl = process.env.REACTION_BASE_URL || browserConfig.base_url.toString();
  browser.url(baseUrl);
  // browser.getSession().then(function (sessionid) {
  //   browser.sessionID = sessionid.id_;
  // });
});

describe("Manage static pages", function () {
  it("verify admin can create static pages", function () {
    const eleMap = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/elements/element-map.yml", "utf8"));
    const eleIds = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/elements/element-ids.yml", "utf8"));
    const usrData = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/config/user-data.yml", "utf8"));

    // default to process env if we've got that
    const adminEmail = process.env.REACTION_EMAIL || usrData.admin_email;
    const adminPassword = process.env.REACTION_AUTH || usrData.admin_pw;

    browser.pause("5000");
    browser.click(eleMap.login_dropdown_btn);
    browser.pause(3000);
    browser.setValue(getId.retId(eleIds.login_email_fld_id), adminEmail);
    browser.setValue(getId.retId(eleIds.login_pw_fld_id), adminPassword);
    browser.click(eleMap.login_btn);
    browser.pause("5000");

    browser.click(eleMap.account_dropdown);
    browser.pause(3000);
    browser.url(baseUrl + "/reaction/dashboard");
    browser.pause(2000);
    browser.click(eleMap.manage_static_page);
    browser.pause(10000);
    browser.setValue("#static-page-title", "About-Page");
    browser.setValue("#static-page-slug", "About-Page");
    browser.execute(() => {
      document.getElementById("editormd").value = "Just About page test";
      document.querySelector(".CodeMirror-line > span")
        .innerText = "Just About page test";
    });
    browser.pause(3000);
    browser.click("#static-pages-submit");
    browser.pause(2000);
    browser.click("#looged-in-display-name");
    browser.pause(2000);
    browser.waitForVisible(eleMap.created_page);
    browser.click(eleMap.created_page);
    browser.pause(5000);

    browser.click(eleMap.account_dropdown);
    browser.pause(1000);
    browser.url(baseUrl + "/reaction/dashboard");
    browser.pause(2000);
    browser.click(eleMap.manage_static_page);
    browser.pause(2000);
    browser.click(eleMap.delete_page);
    browser.pause(2000);
    browser.click(eleMap.confirm_delete);
    browser.pause(500);
    browser.click(eleMap.home_page);
  });
});

