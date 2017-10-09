import { Template } from "meteor/templating";
import { Meteor } from "meteor/meteor";
import { Reaction } from "/client/api";
import "./review.html";
import { Reviews } from "/lib/collections";
import { Products } from "/lib/collections";
import { Packages } from "/lib/collections";
import { ReactiveDict } from "meteor/reactive-dict";

console.log(Products);
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
        console.log(error, result);
        if (error) {
          return error;
        }
        console.log(result);
        return result;
      });
    }    catch (error) {
      Alerts.toast("You need to sign in to post a review", "error");
    }
  }
});


Template.showReviews.helpers({
  reviews: () => {
    const productId = () => Reaction.Router.getParam("handle");
    console.log(productId());
    const productidentification =  Products.findOne(productId()) && Products.findOne(productId())._id;
    Meteor.subscribe("Reviews");
    return Reviews.find({productId: productidentification}).fetch();
  }
});
