import { Session } from "meteor/session";
import { Template } from "meteor/templating";
import _ from "underscore";

Template.filterSearch.helpers({
  getVendors(products) {
    return _.uniq(_.pluck(products, "vendor"));
  }
});

Template.filterSearch.events({
  "change #price-filter": function (event) {
    Session.set("filterPrice", event.target.value);
  },
  "change #vendor-filter": function (event) {
    Session.set("filterVendor", event.target.value);
  },
  "change #sortByLatest": function (event) {
    Session.set("sortByLatest", event.target.value);
  }
});

Template.sortRelevance.events({
  "change #sortRelevance": function (event) {
    Session.set("sortValue", event.target.value);
  }
});
