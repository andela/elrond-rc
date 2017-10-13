import { Template } from "meteor/templating";
import { Meteor } from "meteor/meteor";
import { Reaction } from "/client/api";
import { Reviews } from "/lib/collections";
import { Products } from "/lib/collections";
import { Packages } from "/lib/collections";
import { ReactiveDict } from "meteor/reactive-dict";
import "./review.html";

const review = {};
Template.productReviews.events({
  "click .stars": () => {
    const rating = $('#rating').data('userrating');
    review.rating = rating;
  },
  "click #submit": () => {
    review.comment = document.getElementById("comment").value;
    if (review.comment === "") {
      Alerts.toast("Sorry can't send an empty comment", "error");
      return false;
    }
    const productId = () => Reaction.Router.getParam("handle");
    document.getElementById("comment").value = "";
    review.productId = Products.findOne(productId())._id;
    try {
      review.username = Meteor.user().username || Meteor.user().emails[0].address;
      review.dateCreated = new Date;
      Meteor.call("insert/review", review, function (error, result) {
        if (error) {
          return error;
        }
        return result;
      });
    } catch (error) {
      Alerts.toast("You need to sign in to post a review", "error");
    }
  }
});


Template.showReviews.helpers({
  reviews: () => {
    const productId = () => Reaction.Router.getParam("handle");
    const productidentification = Products.findOne(productId()) && Products.findOne(productId())._id;
    Meteor.subscribe("Reviews");
    return Reviews.find({ productId: productidentification }).fetch();
  }
});

Template.embedSocial.onCreated(function () {
  this.state = new ReactiveDict();
  this.state.setDefault({
    feed: {}
  });

  this.autorun(() => {
    this.subscribe("Packages");
    const socialConfig = Packages.findOne({
      name: "reaction-social"
    });
    this.state.set("feed", socialConfig.settings.public.apps);
  });
});

Template.embedSocial.helpers({
  testDisplay() {
    const config = Template.instance().state.get("feed");
    const checkFacebook = config.facebook.enabled;
    const checkTwitter = config.twitter.enabled;
    if (checkFacebook && checkTwitter) {
      return {facebook: "col-sm-6", twitter: "col-sm-6"};
    } else if (checkFacebook && !checkTwitter) {
      return {facebook: "col-sm-6", twitter: ""};
    } else if (!checkFacebook && checkTwitter) {
      return {facebook: "", twitter: "col-sm-6"};
    }
    return {facebook: "", twitter: ""};
  },
  twitter() {
    const twitterConfig = Template.instance().state.get("feed").twitter;
    if (twitterConfig.enabled && twitterConfig.profilePage) {
      return twitterConfig.profilePage;
    }
    return false;
  },
  facebook() {
  const facebookConfig = Template.instance().state.get("feed").facebook;
    if (facebookConfig.enabled && facebookConfig.appId &&
    facebookConfig.profilePage) {
      const baseUrl = "https://www.facebook.com/plugins/page.php?";
      const href = `href=${facebookConfig.profilePage}`;
      const dimensions = "&tabs=timeline&width=400&height=400&";
      const sHeader = "small_header=false&adapt_container_width=true";
      const remainder = "&hide_cover=false&show_facepile=false&";
      const appID = `appId=${facebookConfig.appId}`;
      url = `${baseUrl}${href}${dimensions}${sHeader}${remainder}${appID}`;
      return url;
    }
    return false;
   }
});
