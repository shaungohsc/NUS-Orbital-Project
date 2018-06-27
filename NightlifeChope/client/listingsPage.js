import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Listings } from '../imports/api/listings.js';
//import { Listings } from '../server/main.js';

import '../templates/listingsTemplate.html';
import '../templates/adminTemplate.html';

Template.listingsDisplay.helpers({
  listings() {
    return Listings.find({});
  },
  currentListing() {
    return Session.get('selectedListing');
  },
  items: [
    { name: "foo", pet: "dog" },
    { name: "bar", pet: "cat" }
  ]
});

Template.listingsDisplay.events({
  'click li'() {
  	console.log(this._id);
  },
  'click .delete'() {
    if(confirm('Delete listing?')){
      Listings.remove(this._id);
    }
  },
  'click .edit'() {
    Session.set('selectedListing', this);
    console.log(this);

  }
});
