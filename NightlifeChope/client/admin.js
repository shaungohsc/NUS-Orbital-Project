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
    var listingName = event.target.name.value
    var listingDesc = event.target.description.value;

    console.log(listingName + "\n" + listingDesc);
    Listings.insert({
    	name: listingName, 
    	description: listingDesc
    });
	}
});




/*Meteor.publish("fileUploads", function () {
  console.log("publishing fileUploads");
  return YourFileCollection.find();
});*/