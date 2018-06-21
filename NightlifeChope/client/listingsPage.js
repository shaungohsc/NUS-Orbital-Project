import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
 
import { Listings } from '../imports/api/listings.js';
//import { Listings } from '../server/main.js';

import '../templates/listingsTemplate.html';
import '../templates/adminTemplate.html';

Template.listingsTemplate.helpers({
  listings() {
    return Listings.find({});
  },
  items: [
    { name: "foo", pet: "dog" },
    { name: "bar", pet: "cat" }
  ]
});

Template.listingsTemplate.events({
  'click li'() {
  	console.log(this._id);
  },
});


