import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Listings } from '../imports/api/listings.js'
import { Queries } from '../imports/api/queries.js'

Meteor.startup(() => {

});

// Meteor.publish("listingsDisplay", function() {
//   // var currentUserId = this.userId;
//   // return Listings.find({ createdBy: currentUserId });
//   return Listings.find();
// });
