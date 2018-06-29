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
  },
  'submit .editform'(event) {
    event.preventDefault();

    var listingName = event.target.name.value;
    var listingDesc = event.target.description.value;
    console.log(listingName + " " + listingDesc + " " + event.target.pax.value);

    Listings.update(this._id, {
      $set: { name: event.target.name.value,
              pax: event.target.pax.value,
              description: event.target.description.value,
            },
    });
  },
});
/*
  'submit .adminform'(event) {
    event.preventDefault();
    console.log("Form submitted");
    console.log(event);
    var listingName = event.target.name.value;
    var listingDesc = event.target.description.value;
    var createdBy = Meteor.user().username;

    console.log(listingName + " " + listingDesc + " " + createdBy);
    Listings.insert({
      name: event.target.name.value,
      pax: event.target.pax.value,
      description: event.target.description.value,
      createdBy: Meteor.userId(),
      createdAt: new Date()
    });
  }
});
*/
Template.home.events({
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

