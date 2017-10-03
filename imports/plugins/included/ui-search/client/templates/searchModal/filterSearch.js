import { Session } from "meteor/session";
import { Template } from "meteor/templating";
import _ from "underscore";

Template.filterSearch.helpers({
  getBrands(products) {
    return _.uniq(_.pluck(products, "vendor"));
  }
});

Template.filterSearch.events({
  "change #filterBySearch": function (event) {
    Session.set("filterPrice", event.target.value);
    console.log("I never ready abeg!", event.target.value); // eslint-disable-line
  }
});
