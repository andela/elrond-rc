import { Session } from "meteor/session";
import { Template } from "meteor/templating";
import _ from "underscore";

Template.filterSearch.helpers({
  getBrands(products) {
    // console.log(products)
    return _.uniq(_.pluck(products, "vendor"));
  }
});

Template.filterSearch.events({
  "change #price-filter": function (event) {
    // console.log(event.target.value);
    Session.set("filterPrice", event.target.value);
  },
  "change #vendor-filter": function (event) {
    Session.set("filterVendor", event.target.value);
  }
});

Template.sortRelevance.events({
  "change #sortRelevance": function (event) {
    // console.log(event.target.value, 'hello world')
    Session.set("sortValue", event.target.value);
  }
});
