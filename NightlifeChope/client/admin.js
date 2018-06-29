import { Meteor } from 'meteor/meteor';
import './html/navbar.html'
import './html/main.html'

import { Listings } from '../imports/api/listings.js';
//import { Listings } from '../server/main.js';

Template.adminTemplate.helpers({
});

Template.adminTemplate.events({
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

    event.target.name.value = "";
    event.target.description.value = "";
    event.target.pax.value = 1;
    event.target.listingDate.value = "";
    event.target.startTime.value = "";
    event.target.endTime.value = "";
	}
});




/*Meteor.publish("fileUploads", function () {
  console.log("publishing fileUploads");
  return YourFileCollection.find();
});*/
